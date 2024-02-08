import { NextResponse } from "next/server";
export async function POST(req) {
  const OpenAI = require("openai");
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  //const prompt = req.body.prompt;
  const { prompt } = await req.json();

  if (!prompt) return NextResponse.json({ message: "Prompt not found." });
 
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        // content:  `An imaginative title of the story using words in the ${prompt} `,
        content: `You are a talented writer of fairy tales. Write a very short children's story about: ${prompt}. 
        Give the story a three word title related to the ${prompt}.
        Do not write the word "Title". For example: "The Enchanted Forest" not "Title: The Enchanted Forest"
        After the title, always begin the story with "Once upon a time ".
        Finish the end of the story with "~The End~"`,
      },
      {
        role: "user",
        content: `prompt: ${prompt}\n`,
      },
    ],
    max_tokens: 700,
  });

  return NextResponse.json({
    //title: response.choices[0]?.message?.content?.trim() || "",
    story: response.choices[0]?.message?.content?.trim() || "",
  });
}
