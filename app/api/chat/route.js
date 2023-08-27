import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// ! I'd like for this to be inside the useChat folder, and for the index.js to be in components, but the path redecleration for the API
// ! Is not working correctly. Leaving it here until I can do a fix.

//Create OpenAI API Client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // Extract messages from the body of request
    const { messages } = await req.json();
    console.log(messages);

    // Call OpenAI for a chat completion stream, given the messages
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    // Convert response into a text stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.log(e);
  }
}
