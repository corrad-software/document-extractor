import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = event.context.params.id;
  
  // Initialize Supabase client
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  );

  try {
    // Delete document from Supabase
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Error deleting document:', error);
    
    return {
      success: false,
      error: error.message || 'Failed to delete document'
    };
  }
}); 