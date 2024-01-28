import { NextResponse } from "next/server";
export async function POST(req) {
  const OpenAI = require("openai");
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  //const prompt = req.body.prompt;
  const { prompt } = await req.json();

  if (!prompt)
return NextResponse.json({ message: "Ingredients not found." });
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: `write a children's short story about: ${prompt}. `,
      },
      {
        role: "user",
        content: `prompt: ${prompt}\n`,
      },
    ],
    max_tokens: 200,
  });

  return NextResponse.json({
    story: response.choices[0]?.message?.content?.trim() || "",
  });
}
