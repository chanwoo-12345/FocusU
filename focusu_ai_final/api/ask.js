// /api/ask.js (Vercel serverless function)
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;
  try {
    const chat = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });
    res.status(200).json({ answer: chat.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "OpenAI 오류 발생" });
  }
}
