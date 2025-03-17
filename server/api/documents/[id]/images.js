import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();

    // Get document ID from the URL
    const documentId = event.context.params.id;

    if (!documentId) {
      return {
        success: false,
        error: "Document ID is required",
      };
    }

    console.log("Fetching images for document:", documentId);

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    );

    // First, get the document details
    const { data: document, error: documentError } = await supabase
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (documentError) {
      throw new Error(`Failed to fetch document: ${documentError.message}`);
    }

    if (!document) {
      return {
        success: false,
        error: "Document not found",
      };
    }

    // Fetch all pages for this document, ordered by page number
    const { data: pages, error: pagesError } = await supabase
      .from("document_pages")
      .select("*")
      .eq("document_id", documentId)
      .order("page_number", { ascending: true });

    if (pagesError) {
      throw new Error(`Failed to fetch document pages: ${pagesError.message}`);
    }

    // If no pages found, return empty array
    if (!pages || pages.length === 0) {
      console.log("No pages found for document:", documentId);
      return {
        success: true,
        document,
        images: [],
      };
    }

    console.log("Found pages:", pages.length);

    // Map the pages to the expected format
    const images = pages.map((page) => ({
      name: `page${page.page_number}.png`,
      path: page.image_path,
      url: page.image_url,
      page: page.page_number,
      size: page.metadata?.size || 0,
      created: page.created_at,
      metadata: page.metadata
    }));

    console.log("Processed images:", images.length);

    return {
      success: true,
      document: {
        id: document.id,
        fileName: document.file_name,
        fileSize: document.file_size,
        pageCount: document.page_count,
        processedPages: document.processed_pages,
        status: document.status,
        createdAt: document.created_at,
        updatedAt: document.updated_at
      },
      images,
    };
  } catch (error) {
    console.error("Error fetching document images:", error);

    return {
      success: false,
      error: error.message,
    };
  }
});
