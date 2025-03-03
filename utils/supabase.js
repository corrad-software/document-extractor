import { createClient } from '@supabase/supabase-js';

export const useSupabase = () => {
  const config = useRuntimeConfig();
  
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'X-Client-Info': 'document-extractor'
        }
      }
    }
  );

  return { supabase };
};

export const useSupabaseStorage = () => {
  const { supabase } = useSupabase();
  
  /**
   * Upload a file to Supabase Storage
   * @param {File} file - The file to upload
   * @param {string} bucket - The storage bucket name
   * @param {string} path - The path within the bucket (optional)
   * @returns {Promise<{data: any, error: any}>} - Upload result
   */
  const uploadFile = async (file, bucket, path = '') => {
    try {
      // Create a unique file name using timestamp and original name
      const timestamp = new Date().getTime();
      const fileName = path 
        ? `${path}/${timestamp}-${file.name}` 
        : `${timestamp}-${file.name}`;
      
      console.log('Attempting direct upload to Supabase storage:', fileName);
      
      // Try to upload directly first
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });
      
      if (error) {
        console.error('Supabase upload error:', error.message);
        
        // If it's not an RLS error, just return the error
        if (!error.message.includes('row-level security')) {
          return { data, error };
        }
        
        // For RLS errors, we'll let the caller handle it
        // The client-side code will try the server upload as a fallback
        return { 
          data: null, 
          error: {
            message: `Row-level security policy violation: ${error.message}`,
            code: 'RLS_VIOLATION'
          }
        };
      }
      
      return { data, error };
    } catch (err) {
      console.error('Upload error:', err);
      return { 
        data: null, 
        error: {
          message: err.message || 'Unknown upload error',
          originalError: err
        }
      };
    }
  };
  
  /**
   * Get a public URL for a file in Supabase Storage
   * @param {string} bucket - The storage bucket name
   * @param {string} path - The file path within the bucket
   * @returns {string} - Public URL for the file
   */
  const getPublicUrl = (bucket, path) => {
    try {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
    } catch (error) {
      console.error('Error getting public URL:', error);
      // Return a placeholder if there's an error
      return '#';
    }
  };
  
  /**
   * Delete a file from Supabase Storage
   * @param {string} bucket - The storage bucket name
   * @param {string} path - The file path within the bucket
   * @returns {Promise<{data: any, error: any}>} - Delete result
   */
  const deleteFile = async (bucket, path) => {
    try {
      return await supabase.storage.from(bucket).remove([path]);
    } catch (error) {
      console.error('Error deleting file:', error);
      return { data: null, error };
    }
  };
  
  return {
    uploadFile,
    getPublicUrl,
    deleteFile
  };
}; 