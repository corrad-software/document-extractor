import { createClient } from '@supabase/supabase-js';
import { readMultipartFormData } from 'h3';
import { randomUUID } from 'crypto';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    );
    
    // Parse the multipart form data
    const formData = await readMultipartFormData(event);
    
    if (!formData || formData.length === 0) {
      return {
        success: false,
        error: 'No form data provided'
      };
    }
    
    // Find the file part
    const filePart = formData.find(part => part.name === 'file');
    if (!filePart) {
      return {
        success: false,
        error: 'No file provided'
      };
    }
    
    // Find the bucket part
    const bucketPart = formData.find(part => part.name === 'bucket');
    const bucket = bucketPart ? new TextDecoder().decode(bucketPart.data) : 'documents';
    
    // Generate a random ID for the file
    const fileId = randomUUID();
    const path = `${fileId}.pdf`;
    
    // Check if it's a PDF by examining the content type
    if (filePart.type !== 'application/pdf') {
      return {
        success: false,
        error: 'Only PDF files are supported'
      };
    }
    
    // Upload the file to Supabase Storage using admin privileges
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, filePart.data, {
        contentType: 'application/pdf',
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Server upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }

    // Get the file name from the Content-Disposition header if available
    const contentDisposition = filePart.filename || 'document.pdf';
    const fileName = contentDisposition.split('\\').pop().split('/').pop();

    // Insert document record into the documents table
    const { error: dbError } = await supabase
      .from('documents')
      .insert({
        id: fileId,
        file_name: fileName,
        file_size: filePart.data.length,
        mime_type: filePart.type,
        storage_path: path,
        status: 'pending',
        processed_pages: 0,
        metadata: {
          originalName: fileName,
          uploadedAt: new Date().toISOString()
        }
      });

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Try to delete the uploaded file if database insert fails
      await supabase.storage.from(bucket).remove([path]);
      return {
        success: false,
        error: `Failed to record document: ${dbError.message}`
      };
    }
    
    return {
      success: true,
      path: path,
      id: fileId,
      message: 'File uploaded successfully via server'
    };
  } catch (error) {
    console.error('Server upload error:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
}); 