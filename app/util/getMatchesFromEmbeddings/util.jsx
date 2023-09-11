import getPineconeClient from "../../../pineconeConfig";

const getMatchesFromEmbeddings = async (embeddings, topK, namespace) => {
  const pinecone = await getPineconeClient();

  const indexes = await pinecone.listIndexes();
  console.log(indexes);

  if (
    !indexes.includes(
      process.env.PINECONE_INDEX || process.env.NEXT_PUBLIC_PINECONE_INDEX
    )
  ) {
    throw new Error(
      `Index ${
        process.env.PINECONE_INDEX || process.env.NEXT_PUBLIC_PINECONE_INDEX
      } does not exist`
    );
  }

  const index = pinecone.Index(
    process.env.PINECONE_INDEX || process.env.NEXT_PUBLIC_PINECONE_INDEX
  );

  const queryRequest = {
    vector: embeddings,
    topK,
    includeMetadata: true,
    namespace,
  };

  console.log(queryRequest);

  try {
    const queryResult = await index.query({ queryRequest });
    return queryResult.matches || [];
  } catch (e) {
    console.log("Error querying embeddings: ", e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};

export default getMatchesFromEmbeddings;
