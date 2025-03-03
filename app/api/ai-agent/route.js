import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = "gemini-1.5-pro"; // Change model as needed

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `
            Act as an AI expert who provides clear and structured explanations in JSON format.  
Your response should strictly follow this JSON structure:

{
  "question": "${question}",
  "explanation": [
    "{Step-by-step explanation in simple terms}",
    "{Break the explanation into clear parts}",
    "{Ensure each step follows logically}",
    "{Make it easy to understand}"
  ],
  "keyPoints": [
    "{Key point 1}",
    "{Key point 2}",
    "{Key point 3}",
    "{Key point 4}"
  ]
}

- The **explanation** should be an **array**, with each step clearly outlined in a separate string.  
- The **key points** should summarize the most important aspects concisely.  
- Do **not** add any extra text outside of the JSON format.

Now, answer this question in JSON format:  
"${question}"

          `,
            },
          ],
        },
      ],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json(
        { error: "AI did not return a valid response" },
        { status: 500 }
      );
    }

    const aiResponse = data.candidates[0].content.parts[0].text; // Extract AI response

    // Extract only valid JSON
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "AI response is not in valid JSON format." },
        { status: 500 }
      );
    }
    console.log(jsonMatch);
    const jsonData = JSON.parse(jsonMatch[0]);

    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    console.error("AI Agent Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
