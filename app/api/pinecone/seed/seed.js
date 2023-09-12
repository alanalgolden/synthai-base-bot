/* import {
  RecursiveCharacterTextSplitter,
  MarkdownTextSplitter,
  Document,
} from "@pinecone-database/doc-splitter";
import { utils } from "@pinecone-database/pinecone";
import { Crawler } from "../crawler/crawler";
import getPineconeClient from "../../../../pineconeConfig";
import getEmbeddings from "../../openai/getEmbeddings/route";
import md5 from "md5";

// ! Currently placeholder, these can be in a cofig file later.
const options = {
  splittingMethod: "recursive",
  chunkSize: 10,
  chunkOverlap: 5,
};

const { chunkedUpsert, createIndexIfNotExists } = utils;

// Removed 'url', 'depth', options -> seed(url, depth, index, options)
async function seed(url, indexName) {
  try {
    // Initialize Pinecone client
    const pinecone = await getPineconeClient();

    // Destructure options for use
    const { splittingMethod, chunkSize, chunkOverlap } = options;

    // Initalize Crawler with default args
    const crawler = new Crawler();

    // Crawl the given URL and get the pages
    const pages = await crawler.crawl(url);

    // Create splitter, choose splitting method
    let splitter;
    if (splittingMethod === "recursive") {
      splitter = new RecursiveCharacterTextSplitter({
        chunkSize,
        chunkOverlap,
      });
    } else {
      splitter = new MarkdownTextSplitter({});
    }

    // Prep documents by splitting the pages
    const documents = await Promise.all(
      pages.map((page) => prepareDocument(page, splitter))
    );

    // Create Pinecone index if it does not exist
    await createIndexIfNotExists(pinecone, indexName, 1536);
    const index = pinecone && pinecone.Index(indexName);

    // Get the vector embeddings for the documents
    const vectors = await Promise.all(documents.flat().map(embedDocument));

    // Upsert vectors into the Pinecone index
    await chunkedUpsert(index, vectors, "", 10);

    // Return the first document
    return documents[0];
  } catch (error) {
    console.error("Error seeding:", error);
  }
}

async function embedDocument(doc) {
  try {
    // Generate OpenAI embeddings for the document content
    const embedding = await getEmbeddings(doc.pageContent);

    // Create a hash of the document content
    const hash = md5(doc.pageContent);

    // Return the vector embedding object
    return {
      id: hash,
      values: embedding,
      metadata: {
        chunk: doc.pageContent,
        text: doc.metadata.text,
        url: doc.metadata.url,
        hash: doc.metadata.hash,
      },
    };
  } catch (error) {
    console.log("Error embedding document: ", error);
    throw error;
  }
}

async function prepareDocument(page, splitter) {
  // Get the content of the page
  const pageContent = page.content;

  // Split the documents using the provided splitter
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        url: page.url,
        // Truncate the text to a maximum byte length
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  // Map over the documents and add a hash to their metadata
  return docs.map((doc) => {
    return {
      pageContent: doc.pageContent,
      metadata: {
        ...doc.metadata,
        // Create a hash of the document content
        hash: md5(doc.pageContent),
      },
    };
  });
}

export default seed;
 */
