// Destructure PDFParse from the module
const { PDFParse } = require("pdf-parse");
const ApiError = require("../utils/ApiError");

async function extractText(buffer) {
  let parser = null;
  try {
    // Instantiate using the class name
    parser = new PDFParse({ data: buffer });
    const result = await parser.getText();

    const text = (result.text || "").trim();
    if (!text || text.length < 50) {
      throw ApiError.badRequest("Could not extract readable text...");
    }

    return {
      text,
      meta: { numPages: result.pages?.length || null },
    };
  } catch (err) {
    if (err.isOperational) throw err;
    console.error("PDF parse error:", err);
    throw ApiError.badRequest("Failed to parse PDF.");
  } finally {
    if (parser && typeof parser.destroy === "function") {
      await parser.destroy();
    }
  }
}

module.exports = { extractText };
