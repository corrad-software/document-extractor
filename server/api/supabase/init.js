import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    
    // Create Supabase client with service role key for admin operations
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    );
    
    // First, create SQL functions to manage storage policies if they don't exist
    const createPolicySql = `
      -- Function to create a storage policy
      CREATE OR REPLACE FUNCTION create_storage_policy(
        bucket_name TEXT,
        policy_name TEXT,
        definition TEXT,
        operation TEXT
      ) RETURNS VOID AS $$
      DECLARE
        policy_exists BOOLEAN;
      BEGIN
        -- Check if policy exists
        SELECT EXISTS (
          SELECT 1 FROM pg_policies 
          WHERE schemaname = 'storage' 
          AND tablename = 'objects' 
          AND policyname = policy_name
        ) INTO policy_exists;
        
        -- Create policy if it doesn't exist
        IF NOT policy_exists THEN
          EXECUTE format(
            'CREATE POLICY %I ON storage.objects FOR %s TO anon USING (bucket_id = %L AND %s)',
            policy_name,
            operation,
            bucket_name,
            definition
          );
        END IF;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
      
      -- Function to update a storage policy
      CREATE OR REPLACE FUNCTION update_storage_policy(
        bucket_name TEXT,
        policy_name TEXT,
        definition TEXT,
        operation TEXT
      ) RETURNS VOID AS $$
      DECLARE
        policy_exists BOOLEAN;
      BEGIN
        -- Check if policy exists
        SELECT EXISTS (
          SELECT 1 FROM pg_policies 
          WHERE schemaname = 'storage' 
          AND tablename = 'objects' 
          AND policyname = policy_name
        ) INTO policy_exists;
        
        -- Update or create policy
        IF policy_exists THEN
          EXECUTE format(
            'DROP POLICY IF EXISTS %I ON storage.objects',
            policy_name
          );
        END IF;
        
        EXECUTE format(
          'CREATE POLICY %I ON storage.objects FOR %s TO anon USING (bucket_id = %L AND %s)',
          policy_name,
          operation,
          bucket_name,
          definition
        );
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
      
      -- Function to get all policies
      CREATE OR REPLACE FUNCTION get_policies()
      RETURNS TABLE (
        schemaname TEXT,
        tablename TEXT,
        policyname TEXT,
        roles TEXT[],
        cmd TEXT,
        qual TEXT,
        with_check TEXT
      ) AS $$
      BEGIN
        RETURN QUERY SELECT 
          p.schemaname::TEXT,
          p.tablename::TEXT,
          p.policyname::TEXT,
          p.roles::TEXT[],
          p.cmd::TEXT,
          p.qual::TEXT,
          p.with_check::TEXT
        FROM pg_policies p
        WHERE p.schemaname = 'storage';
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;
    
    // Execute the SQL to create the functions
    try {
      await supabase.rpc('exec_sql', { sql: createPolicySql });
    } catch (sqlError) {
      console.warn('Could not create SQL functions:', sqlError.message);
      
      // Try an alternative approach - create the exec_sql function first
      const execSqlFunc = `
        CREATE OR REPLACE FUNCTION exec_sql(sql TEXT) RETURNS VOID AS $$
        BEGIN
          EXECUTE sql;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `;
      
      try {
        // Try to execute raw SQL to create the exec_sql function
        const { error: execSqlError } = await supabase.from('_exec_sql').rpc('exec_sql', { 
          sql: execSqlFunc 
        });
        
        if (!execSqlError) {
          // Now try to create the policy functions
          await supabase.rpc('exec_sql', { sql: createPolicySql });
        }
      } catch (altError) {
        console.warn('Could not create SQL functions with alternative approach:', altError.message);
      }
    }
    
    // Check if the documents bucket exists, if not create it
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw new Error(`Failed to list buckets: ${bucketsError.message}`);
    }
    
    const documentsBucketExists = buckets.some(bucket => bucket.name === 'documents');
    
    if (!documentsBucketExists) {
      // Create the documents bucket
      const { error: createError } = await supabase.storage.createBucket('documents', {
        public: true, // Make files publicly accessible
        fileSizeLimit: 10485760, // 10MB limit
        allowedMimeTypes: ['application/pdf'] // Only allow PDFs
      });
      
      if (createError) {
        throw new Error(`Failed to create documents bucket: ${createError.message}`);
      }
      
      // Update RLS policies to allow public uploads
      // First, get the policy ID for the bucket
      const { data: policies, error: policiesError } = await supabase.rpc('get_policies');
      
      if (policiesError) {
        console.warn('Could not fetch policies:', policiesError.message);
      } else {
        // Update the policy to allow anonymous uploads
        try {
          // Create a policy that allows anyone to upload files
          await supabase.rpc('create_storage_policy', {
            bucket_name: 'documents',
            policy_name: 'allow_public_uploads',
            definition: 'true', // Allow all operations
            operation: 'INSERT'
          });
          
          // Create a policy that allows anyone to read files
          await supabase.rpc('create_storage_policy', {
            bucket_name: 'documents',
            policy_name: 'allow_public_reads',
            definition: 'true', // Allow all operations
            operation: 'SELECT'
          });
        } catch (policyError) {
          console.warn('Could not create policies:', policyError.message);
        }
      }
      
      return {
        success: true,
        message: 'Documents bucket created successfully with public access'
      };
    }
    
    // If bucket exists, ensure the policies are set correctly
    try {
      // Update the policy to allow anonymous uploads
      await supabase.rpc('update_storage_policy', {
        bucket_name: 'documents',
        policy_name: 'allow_public_uploads',
        definition: 'true', // Allow all operations
        operation: 'INSERT'
      });
      
      // Update the policy to allow anonymous reads
      await supabase.rpc('update_storage_policy', {
        bucket_name: 'documents',
        policy_name: 'allow_public_reads',
        definition: 'true', // Allow all operations
        operation: 'SELECT'
      });
    } catch (policyError) {
      console.warn('Could not update policies, attempting to create them:', policyError.message);
      
      try {
        // Create a policy that allows anyone to upload files
        await supabase.rpc('create_storage_policy', {
          bucket_name: 'documents',
          policy_name: 'allow_public_uploads',
          definition: 'true', // Allow all operations
          operation: 'INSERT'
        });
        
        // Create a policy that allows anyone to read files
        await supabase.rpc('create_storage_policy', {
          bucket_name: 'documents',
          policy_name: 'allow_public_reads',
          definition: 'true', // Allow all operations
          operation: 'SELECT'
        });
      } catch (createPolicyError) {
        console.warn('Could not create policies:', createPolicyError.message);
      }
    }
    
    // As a fallback, try to directly execute SQL to set RLS policies
    try {
      const directSql = `
        -- Enable RLS on storage.objects
        ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
        
        -- Create policies for the documents bucket
        DROP POLICY IF EXISTS "Allow public uploads to documents" ON storage.objects;
        CREATE POLICY "Allow public uploads to documents" 
          ON storage.objects 
          FOR INSERT 
          TO anon 
          WITH CHECK (bucket_id = 'documents');
          
        DROP POLICY IF EXISTS "Allow public reads from documents" ON storage.objects;
        CREATE POLICY "Allow public reads from documents" 
          ON storage.objects 
          FOR SELECT 
          TO anon 
          USING (bucket_id = 'documents');
      `;
      
      await supabase.rpc('exec_sql', { sql: directSql });
    } catch (directSqlError) {
      console.warn('Could not set policies with direct SQL:', directSqlError.message);
    }
    
    return {
      success: true,
      message: 'Documents bucket already exists and policies updated'
    };
  } catch (error) {
    console.error('Supabase initialization error:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
}); 