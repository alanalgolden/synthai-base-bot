import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

async function getEmbeddings(input) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: input.replace(/\n/g, " "),
    });

    const result = await response.json();
    //console.log(response);
    console.log(result);
    return result.data[0].embedding;
  } catch (e) {
    console.log("Error calling OpenAI embedding API: ", e);
    throw new Error(`Error calling OpenAI embedding API: ${e}`);
  }
}

export default getEmbeddings;
