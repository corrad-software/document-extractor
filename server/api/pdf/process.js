import { createClient } from "@supabase/supabase-js";
import { readMultipartFormData } from "h3";
import sharp from "sharp";
import { promises as fs } from "node:fs";
import { pdf } from "pdf-to-img";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Temporary directory for processing
const tempDir = path.join(__dirname, "..", "..", "..", "temp");

// Function to ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.access(tempDir);
  } catch {
    await fs.mkdir(tempDir, { recursive: true });
  }
}

// Function to send progress update via Supabase Realtime
async function sendProgress(supabase, documentId, data) {
  try {
    console.log('Sending progress update:', { documentId, ...data });
    
    const { error } = await supabase
      .from('document_progress')
      .upsert({
        id: documentId,
        ...data,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'id'
      });

    if (error) {
      console.error('Error sending progress update:', error);
      throw error;
    }

    // Verify the update was successful by fetching the latest record
    const { data: latest, error: fetchError } = await supabase
      .from('document_progress')
      .select('*')
      .eq('id', documentId)
      .single();

    if (fetchError) {
      console.error('Error verifying progress update:', fetchError);
    } else {
      console.log('Progress update verified:', latest);
    }
  } catch (error) {
    console.error('Failed to send progress update:', error);
  }
}

export default defineEventHandler(async (event) => {
  try {
    // Ensure temp directory exists
    await ensureTempDir();

    const config = useRuntimeConfig();

    // Create Supabase client with service role key for admin operations
    const supabase = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey
    );

    // Parse the multipart form data
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      console.error("No form data received");
      return {
        success: false,
        error: "No form data provided",
      };
    }

    // Find the file part
    const filePart = formData.find((part) => part.name === "file");
    if (!filePart) {
      console.error("No file part found in form data");
      return {
        success: false,
        error: "No file provided",
      };
    }

    // Get the document ID from form data
    const documentIdPart = formData.find((part) => part.name === "documentId");
    if (!documentIdPart) {
      throw new Error("Document ID is required");
    }

    // Use the provided document ID
    const documentId = new TextDecoder().decode(documentIdPart.data);
    console.log("Processing document with ID:", documentId);

    // Check if it's a PDF by examining the content type
    if (filePart.type !== "application/pdf") {
      console.error("Invalid file type:", filePart.type);
      return {
        success: false,
        error: "Only PDF files are supported",
      };
    }

    // Verify file data
    if (!filePart.data || filePart.data.length === 0) {
      console.error("File data is empty");
      return {
        success: false,
        error: "File data is empty",
      };
    }

    console.log("File size:", filePart.data.length, "bytes");

    const pdfPath = path.join(tempDir, `${documentId}.pdf`);

    try {
      // Save the PDF to a temporary file
      await fs.writeFile(pdfPath, filePart.data);
      console.log("PDF saved to:", pdfPath);

      // Verify the file was written
      const stats = await fs.stat(pdfPath);
      console.log("Saved file size:", stats.size, "bytes");

      if (stats.size === 0) {
        throw new Error("Saved PDF file is empty");
      }

      // Initialize PDF document for processing
      await sendProgress(supabase, documentId, {
        status: "initializing",
        message: "Initializing PDF processing...",
        current_page: 0,
        total_pages: 0,
        progress: 0,
      });

      const document = await pdf(pdfPath, { scale: 2.0 });
      const pageCount = document.length;

      // Update document status to processing
      await supabase
        .from("documents")
        .update({
          status: "processing",
          page_count: pageCount,
        })
        .eq("id", documentId);

      // Send total pages info
      await sendProgress(supabase, documentId, {
        status: "processing",
        message: "Starting page processing...",
        current_page: 0,
        total_pages: pageCount,
        progress: 0,
      });

      const imageResults = [];
      const imageUrls = [];
      let pageNumber = 1;

      // Use document ID as folder name
      const folderName = documentId;
      console.log("Using folder name:", folderName);

      // Process each page using pdf-to-img
      for await (const imageBuffer of document) {
        console.log(`Processing page ${pageNumber} of ${pageCount}`);

        // Calculate progress percentage
        const progress = Math.round((pageNumber / pageCount) * 100);

        await sendProgress(supabase, documentId, {
          status: "processing",
          message: `Processing page ${pageNumber} of ${pageCount}`,
          current_page: pageNumber,
          total_pages: pageCount,
          progress,
        });

        // Optimize the image with sharp
        const optimizedBuffer = await sharp(imageBuffer)
          .resize(1200, null, { fit: "inside" })
          .png({ quality: 90 })
          .toBuffer();

        // Generate a simple filename for the image
        const imageName = `${folderName}/page${pageNumber}.png`;
        console.log("Uploading image:", imageName);

        // Upload the image to Supabase Storage
        const { data, error } = await supabase.storage
          .from("document-images")
          .upload(imageName, optimizedBuffer, {
            contentType: "image/png",
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error(`Error uploading image for page ${pageNumber}:`, error);
          continue;
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from("document-images")
          .getPublicUrl(imageName);

        // Store page information in document_pages table
        const { error: pageError } = await supabase
          .from("document_pages")
          .insert({
            document_id: documentId,
            page_number: pageNumber,
            image_path: data.path,
            image_url: urlData.publicUrl,
            metadata: {
              size: optimizedBuffer.length,
              width: 1200, // We're resizing to max width of 1200
            },
          });

        if (pageError) {
          console.error(`Error storing page ${pageNumber} info:`, pageError);
        }

        imageResults.push({
          page: pageNumber,
          path: data.path,
          url: urlData.publicUrl,
        });

        imageUrls.push(urlData.publicUrl);

        // Update document's processed pages count
        await supabase
          .from("documents")
          .update({
            processed_pages: pageNumber,
          })
          .eq("id", documentId);

        pageNumber++;
      }

      // Send completion status and update document record
      await Promise.all([
        sendProgress(supabase, documentId, {
          status: "complete",
          message: "Processing complete!",
          current_page: pageCount,
          total_pages: pageCount,
          progress: 100,
        }),
        supabase
          .from("documents")
          .update({
            status: "completed",
            page_count: pageCount,
            processed_pages: pageCount,
            updated_at: new Date().toISOString(),
          })
          .eq("id", documentId),
      ]);

      // Clean up temporary files
      try {
        await fs.unlink(pdfPath);
        // Clean up any other temporary files
        const files = await fs.readdir(tempDir);
        for (const file of files) {
          if (file.startsWith(documentId)) {
            await fs.unlink(path.join(tempDir, file));
          }
        }
      } catch (cleanupError) {
        console.warn("Error cleaning up temporary files:", cleanupError);
      }

      return {
        success: true,
        pageCount,
        images: imageResults,
        imageUrls,
        message: `Successfully processed ${pageCount} pages`,
      };
    } catch (error) {
      console.error("PDF processing error:", error);

      // Send error status
      await sendProgress(supabase, documentId, {
        status: "error",
        message: "Processing failed",
        error: error.message,
        progress: 0,
      });

      // Update document status to error if processing fails
      await supabase
        .from("documents")
        .update({
          status: "error",
          error_message: error.message,
          updated_at: new Date().toISOString(),
        })
        .eq("id", documentId);

      return {
        success: false,
        error: error.message,
      };
    }
  } catch (error) {
    console.error("PDF processing error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
});
