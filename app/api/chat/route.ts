import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import portfolioData from "@/content/portfolio-data.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are an AI assistant embedded in Vandan Agrawal's personal portfolio website.
Your sole purpose is to answer questions about Vandan's professional background, projects, skills, and experience.
You have access to the following structured data about Vandan:

${JSON.stringify(portfolioData, null, 2)}

Rules:
1. Only answer questions related to Vandan's work, skills, education, projects, and experience.
2. If asked about unrelated topics, politely redirect to topics about Vandan.
3. Be concise, technical, and professional — like a smart colleague speaking on Vandan's behalf.
4. Use specific numbers and details from the data where relevant.
5. If asked something not covered in the data, say you don't have that information but suggest the user reach out directly.
6. Format responses with markdown when it improves readability (bullet points, bold, code).
7. Address the user naturally — they are likely a recruiter, collaborator, or peer.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history for multi-turn context
    const chatHistory = (history || []).slice(-10).map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })
    );

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (err: unknown) {
    console.error("Gemini API error:", err);
    // Surface the actual error so the client can show it
    let message = "Failed to get a response from the AI.";
    if (err instanceof Error) {
      message = err.message;
      // Gemini SDK wraps HTTP errors — extract the status if present
      const match = err.message.match(/(\d{3})/);
      if (match) {
        const status = parseInt(match[1]);
        if (status === 429) message = "Rate limit exceeded — please wait a moment and try again.";
        if (status === 404) message = "AI model not found — check your API key configuration.";
        if (status === 403) message = "API key not authorized for this model.";
      }
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
