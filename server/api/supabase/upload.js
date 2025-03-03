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