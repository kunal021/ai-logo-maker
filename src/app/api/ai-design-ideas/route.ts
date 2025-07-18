import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = await model.startChat({
      generationConfig: {
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    let text = result.response.text().trim();

    // 🔧 Remove code block markers like ```json or ```
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }
    const json = JSON.parse(text);
    return NextResponse.json(json);
  } catch (error: Error | unknown) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Failed to generate logo ideas." },
      { status: 500 }
    );
  }
}
