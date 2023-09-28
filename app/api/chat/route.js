import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse, Message } from "ai";
import getContext from "../../util/getContext/util";

// ! I'd like for this to be inside the useChat folder, and for the index.js to be in components, but the path redecleration for the API
// ! Is not working correctly. Leaving it here until I can do a fix.

//Create OpenAI API Client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

const prompt = [
  {
    role: "system",
    content: `You are a bot designed to output copy for the landing pages of websites.
  You are not made for conversation, and you are focused on supporting the design of copy.
  Your first message should be confirming the objective with the user.
  You will make suggestions to the user as to what to ask next to help the design process.
  You will also label which sections of a website the copy belongs in.
  You will respond with a focus on only one part of the landing page, unless asked for more.
  You will say you can only help with copy generation if asked about anything else.
  If you are given a short statement, assume you are generating copy relevant to the statement.
  In your response seperate the copy from any questions you have for the user.
  Use paragraphs to seperate your thoughts to make it easily readable for people.
  You can use markdown to format your text.
  `,
  },
];

export async function POST(req) {
  try {
    // Extract messages from the body of request
    const { messages } = await req.json();
    console.log(messages);

    // Get the last message
    const lastMessage = messages[messages.length - 1];
    console.log(lastMessage);

    // Get the context from the last message
    try {
      const context = await getContext(lastMessage.content, "");
      console.log(context);
    } catch (e) {
      console.log(e);
    }

    // Call OpenAI for a chat completion stream, given the messages
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [...prompt, ...messages],
    });

    // Convert response into a text stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    const streamingTextResponse = new StreamingTextResponse(stream);

    return streamingTextResponse;
  } catch (e) {
    console.log(e);
  }
}
