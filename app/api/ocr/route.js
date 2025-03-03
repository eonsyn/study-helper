import { NextResponse } from "next/server";
import { ocrSpace } from "ocr-space-api-wrapper";

export async function POST(req) {
  try {
    const { imageUrl, filePath, base64Image, language } = await req.json();

    let response;
    if (imageUrl) {
      response = await ocrSpace(imageUrl);
    } else if (filePath) {
      response = await ocrSpace(filePath, { apiKey: process.env.OCR_API_KEY });
    } else if (base64Image) {
      response = await ocrSpace(base64Image, {
        apiKey: process.env.OCR_API_KEY,
        language: language || "eng",
      });
    } else {
      return NextResponse.json(
        { error: "No input provided for OCR" },
        { status: 400 }
      );
    }
    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "OCR processing failed", details: error.message },
      { status: 500 }
    );
  }
}
