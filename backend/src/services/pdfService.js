const  PDFParse  = require("pdf-parse");
const ApiError = require("../utils/ApiError");

async function extractText(buffer) {

  try {
    const result = await PDFParse(buffer);

    const text = (result.text || "").trim();
    if (!text || text.length < 50) {
      throw ApiError.badRequest(
        "Could not extract readable text - is this a scanned/image-only PDF",
      );
    }

    return {
      text,
      meta: {
        numPages: result.pages?.length ?? result.numpages ?? null,
      },
    };
  } catch (err) {
    if (err.isOperational) throw err;
    console.error("PDF parse error:", err);
    throw ApiError.badRequest(
      "Failed to parse PDF. Please ensure it's a valid PDF file."
    );
  } 
}

module.exports = { extractText };
