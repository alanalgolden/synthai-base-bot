import getEmbeddings from "../../api/openai/getEmbeddings/route";
import getMatchesFromEmbeddings from "../getMatchesFromEmbeddings/util";

const getContext = async (
  message,
  namespace,
  maxTokens = 1000,
  minScore = 0.8
) => {
  const embedding = await getEmbeddings(message);
  const matches = await getMatchesFromEmbeddings(embedding, 3, namespace);
  const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);

  return qualifyingDocs;
};

export default getContext;
