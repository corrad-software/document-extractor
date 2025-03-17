import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  // Initialize Supabase client
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  );

  try {
    // Fetch documents from Supabase
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return {
      success: true,
      data: data || []
    };
  } catch (error) {
    console.error('Error fetching documents:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to fetch documents'
    };
  }
}); 