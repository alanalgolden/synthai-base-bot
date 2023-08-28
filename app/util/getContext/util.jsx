import getEmbeddings from "../../api/openai/getEmbeddings/route";
import getMatchesFromEmbeddings from "../getMatchesFromEmbeddings/util";

const getContext = async (
  message,
  namespace,
  maxTokens = 1000,
  minScore = 0.7,
  getOnlyText = true
) => {
  const embedding = await getEmbeddings(message);
  console.log(embedding);

  const matches = await getMatchesFromEmbeddings(embedding, 3, namespace);
  console.log(matches);

  const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

  if (!getOnlyText) {
    return qualifyingDocs;
  }

  let docs = matches ? qualifyingDocs.map((match) => match.metadata.chunk) : [];
  return docs.join("\n").substring(0, maxTokens);
};

export default getContext;
