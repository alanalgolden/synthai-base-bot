import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse, Message } from "ai";
import { v4 as uuidv4, v4 } from "uuid";
import getContext from "../../util/getContext/util";
import { storeVectorIds } from "../firebase/storeVectorIds/route";

// ! I'd like for this to be inside the useChat folder, and for the index.js to be in components, but the path redecleration for the API
// ! Is not working correctly. Leaving it here until I can do a fix.

//Create OpenAI API Client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

let contextString;

const prompt = [
  {
    role: "system",
    content: `
    You will help generate new copy for websites. Use the provided context as inspiration, and mimic the tone and style of each piece.
    ===START CONTEXT===
    ${contextString}
    ===END CONTEXT===
    If you are asked directly for a piece of copy, generate it and then ask questions.
    Assume all messages are requests for copy, but of you are unsure what you are being asked for then ask clarifying questions.
    You will always label each piece of copy based on what type it is, so it is clear for the user.
    You are not made for conversation, if you are asked obscure questions, tell the user you are only meant to generate copy and cannot help with that.
    You must use markdown syntax to make your response more clear.
  `,
  },
];

export async function POST(req) {
  try {
    // Extract messages from the body of request
    const { messages, conversationId, messageCount } = await req.json();
    console.log(messages);

    // Get the last message
    const lastMessage = messages[messages.length - 1];
    console.log(lastMessage);

    // Get the context from the last message, I need to figure out another way to access contextString from the client
    try {
      const context = await getContext(lastMessage.content, "");
      const formattedStrings = context.map((m, index) => {
        console.log(m);
        return `${index + 1}. ${m.metadata.input}`;
      });
      contextString = formattedStrings.join("\n");

      const vectorIds = await context.map((m) => m.id);

      console.log(vectorIds);
      console.log(contextString);

      await storeVectorIds(conversationId, vectorIds);
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
