import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    );
    
    // Check if the document-images bucket exists, if not create it
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw new Error(`Failed to list buckets: ${bucketsError.message}`);
    }
    
    const imagesBucketExists = buckets.some(bucket => bucket.name === 'document-images');
    
    if (!imagesBucketExists) {
      // Create the document-images bucket
      const { error: createError } = await supabase.storage.createBucket('document-images', {
        public: true, // Make files publicly accessible
        fileSizeLimit: 20971520, // 20MB limit
        allowedMimeTypes: ['image/png', 'image/jpeg'] // Only allow images
      });
      
      if (createError) {
        throw new Error(`Failed to create document-images bucket: ${createError.message}`);
      }
      
      // As a fallback, try to directly execute SQL to set RLS policies
      try {
        const directSql = `
          -- Enable RLS on storage.objects
          ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
          
          -- Create policies for the document-images bucket
          DROP POLICY IF EXISTS "Allow public uploads to document-images" ON storage.objects;
          CREATE POLICY "Allow public uploads to document-images" 
            ON storage.objects 
            FOR INSERT 
            TO anon 
            WITH CHECK (bucket_id = 'document-images');
            
          DROP POLICY IF EXISTS "Allow public reads from document-images" ON storage.objects;
          CREATE POLICY "Allow public reads from document-images" 
            ON storage.objects 
            FOR SELECT 
            TO anon 
            USING (bucket_id = 'document-images');
        `;
        
        await supabase.rpc('exec_sql', { sql: directSql });
      } catch (directSqlError) {
        console.warn('Could not set policies with direct SQL:', directSqlError.message);
      }
      
      return {
        success: true,
        message: 'Document-images bucket created successfully with public access'
      };
    }
    
    return {
      success: true,
      message: 'Document-images bucket already exists'
    };
  } catch (error) {
    console.error('Supabase initialization error:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
}); 