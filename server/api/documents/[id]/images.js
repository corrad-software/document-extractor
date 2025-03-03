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

    // List all files in the document's folder
    const { data, error } = await supabase.storage
      .from("document-images")
      .list(documentId);

    if (error) {
      throw new Error(`Failed to fetch document images: ${error.message}`);
    }

    // If no images found, return empty array
    if (!data || data.length === 0) {
      console.log("No images found for document:", documentId);
      return {
        success: true,
        images: [],
      };
    }

    console.log("Found images:", data.length);

    // Sort the images by page number
    const sortedImages = data
      .filter((item) => item.name.endsWith(".png")) // Only include PNG files
      .sort((a, b) => {
        // Extract page numbers from filenames (format: pageX.png)
        const pageA = parseInt(a.name.match(/page(\d+)/)?.[1] || "0");
        const pageB = parseInt(b.name.match(/page(\d+)/)?.[1] || "0");
        return pageA - pageB;
      });

    // Get public URLs for each image
    const images = sortedImages.map((item) => {
      const { data: urlData } = supabase.storage
        .from("document-images")
        .getPublicUrl(`${documentId}/${item.name}`);

      // Extract page number from filename
      const pageMatch = item.name.match(/page(\d+)/);
      const pageNumber = pageMatch ? parseInt(pageMatch[1]) : null;

      return {
        name: item.name,
        path: `${documentId}/${item.name}`,
        url: urlData.publicUrl,
        page: pageNumber,
        size: item.metadata?.size || 0,
        created: item.created_at,
      };
    });

    console.log("Processed images:", images.length);

    return {
      success: true,
      documentId,
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
