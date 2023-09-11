import { Pinecone } from "@pinecone-database/pinecone";

const getPineconeClient = async () => {
  let pinecone = null;
  if (!pinecone) {
    pinecone = new Pinecone({
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
