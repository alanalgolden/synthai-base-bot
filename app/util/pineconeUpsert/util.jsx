import { v4 as uuidv4, v4 } from "uuid";

export const pineconeUpsert = async (
  input,
  embedding,
  messageType,
  copyType,
  specificId
) => {
  // This should maybe go through another hop that
  // deals with this logic ahead of time
  let id;

  if (specificId == null) {
    id = uuidv4();
    console.log(id);
  } else {
    id = specificId;
  }

  await fetch("/api/pinecone/pineconeUpsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      id: id,
      embedding: embedding,
      metadata: {
        input: input,
        messageType: messageType,
        copyType: copyType,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
