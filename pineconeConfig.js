import { PineconeClient } from "@pinecone-database/pinecone";

let pinecone = null;

const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new PineconeClient();
    await pinecone.init({
      apiKey:
        process.env.NEXT_PUBLIC_PINECONE_API_KEY ||
        process.env.PINECONE_API_KEY,
      environment:
        process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT ||
        process.env.PINECONE_ENVIRONMENT,
    });
  }
  return pinecone;
};

export default getPineconeClient;
