import getPineconeClient from "../../../../pineconeConfig";
import getEmbeddings from "../../openai/getEmbeddings/route";
import "server-only";

export async function GET(req) {
  const embedding = await getEmbeddings(
    "This is a test embedding, to see if I can get to two vectors!"
  );
  console.log(embedding);
  const pinecone = await getPineconeClient();
  const index = pinecone.Index("base-bot");
  const data = await index.upsert([{ id: "B", values: embedding }]);
  console.log(data);
}
