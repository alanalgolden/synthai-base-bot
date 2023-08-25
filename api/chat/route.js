import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

//Create OpenAI API Client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// Set the runtime to edge
//export const runtime = "edge";

export async function POST(req) {
  try {
    console.log("Does it even ever get here?");
    // Extract messages from the body of request
    const { messages } = await req.json();

    // Call OpenAI for a chat completion stream, given the messages
    const response = await openai.completions.create({
      mode: "gpt-3.5-turbo",
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
