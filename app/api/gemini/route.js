import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question) {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Define a structured prompt
    const prompt = `
      Act as an AI expert who provides clear and structured explanations in JSON format.
      Your response should strictly follow this JSON structure:

      {
        "question": "{User's question}",
        "explanation": "{A detailed explanation in simple terms}",
        "keyPoints": [
          "{Key point 1}",
          "{Key point 2}",
          "{Key point 3}",
          "{Key point 4}"
        ]
      }

      Do not add extra text outside of the JSON format. Provide a well-structured response.
      The explanation should be concise and informative, and the key points should highlight the most important aspects.
      
      Now, answer this question in JSON format:
      "${question}"
    `;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // Validate if the response is in valid JSON format
    let jsonData;
    try {
      jsonData = JSON.parse(aiResponse);
    } catch (error) {
      return Response.json(
        { error: "AI response is not in valid JSON format." },
        { status: 500 }
      );
    }

    return Response.json(jsonData, { status: 200 });
  } catch (error) {
    console.error("AI Agent Error:", error);
    return Response.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
