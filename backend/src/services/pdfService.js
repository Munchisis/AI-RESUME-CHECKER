// 1. Destructure PDFParse from the module instead of trying to require it as a function
const { PDFParse } = require("pdf-parse");
const ApiError = require("../utils/ApiError");

async function extractText(buffer) {
  let parser = null;
  try {
    // 2. Instantiate the parser with your buffer data
    parser = new PDFParse({ data: buffer });

    // 3. Call getText() to extract the text
    const result = await parser.getText();

    const text = (result.text || "").trim();
    if (!text || text.length < 50) {
      throw ApiError.badRequest(
        "Could not extract readable text - is this a scanned/image-only PDF",
      );
    }

    return {
      text,
      meta: {
        // v2 uses page objects or general results depending on your options
        numPages: result.pages?.length || null,
      },
    };
  } catch (err) {
    if (err.isOperational) throw err;
    console.error("PDF parse error:", err);
    throw ApiError.badRequest(
      "Failed to parse PDF. Please ensure it's a valid PDF file.",
    );
  } finally {
    // 4. Always clean up/destroy the parser instance to free up memory
    if (parser && typeof parser.destroy === "function") {
      await parser.destroy();
    }
  }
}

module.exports = { extractText };
