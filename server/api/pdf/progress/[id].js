export default defineEventHandler(async (event) => {
  // Set headers for SSE
  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');
  
  // Get document ID from URL
  const documentId = event.context.params.id;
  
  // Create a response stream
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  
  // Store the writer in a global map to be accessed by the processing endpoint
  if (!global.progressWriters) {
    global.progressWriters = new Map();
  }
  global.progressWriters.set(documentId, writer);
  
  // Clean up when the connection is closed
  event.node.req.on('close', () => {
    global.progressWriters.delete(documentId);
    writer.close();
  });
  
  return sendStream(event, readable);
}); 