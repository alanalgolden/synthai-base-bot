"use client";

import { useState } from "react";
import Footer from "../../components/blocks/Footer";
import VectorCard from "../../components/cards/Vector";
import InfoCard from "../../components/static/InfoCard";
import getEmbeddings from "../api/openai/getEmbeddings/route";
import { pineconeDescribeIndex } from "../util/pineconeDescribeIndex/util";
import { pineconeFetch } from "../util/pineconeFetch/util";
import { pineconeQuery } from "../util/pineconeQuery/util";

export default function ViewData() {
  const [queryTerm, setQueryTerm] = useState("");
  const [copyType, setCopyType] = useState();
  const [resultCount, setResultCount] = useState(0);
  const [currResults, setCurrResults] = useState();

  const inputPlaceholder = "Enter query term...";
  const namespace = "";
  const filter = { copyType: copyType };
  const topK = 5;
  const id = "b397be8c-8a0e-4677-8e53-3b0435992a08";
  const includeValues = false;
  const includeMetadata = true;

  const filterOptions = [
    { value: "heading", label: "Heading" },
    { value: "cta", label: "Call To Action" },
    { value: "slogan", label: "Slogan" },
    { value: "about", label: "About" },
    { value: "body", label: "Body" },
  ];

  async function handleFetch() {
    const fetchRes = await pineconeFetch(id);
    console.log(fetchRes.vectors);
  }

  async function handleDescribeIndex() {
    const fetchRes = await pineconeDescribeIndex(index);
    console.log(fetchRes);
  }

  async function handleQuery() {
    const embeddings = await getEmbeddings(queryTerm);

    const fetchRes = await pineconeQuery({
      namespace: namespace,
      topK: topK,
      filter: filter,
      includeValues: includeValues,
      includeMetadata: includeMetadata,
      vector: embeddings,
    });

    console.log(fetchRes);
    setCurrResults(fetchRes);
    setCopyType();
    setQueryTerm("");
  }

  function handleInputChange(event) {
    setQueryTerm(event.target.value);
  }

  function handleOptionChange(event) {
    setCopyType(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleQuery();
    }
  }

  return (
    <div className="h-screen bg-slate-900">
      <div className="flex">
        <div
          className="flex-auto p-8 overflow-x-auto overflow-y-auto ml-64 min-w-[40rem] bg-slate-900"
          style={{ minHeight: "100vh", width: "max-content" }}
        >
          <div>
            <InfoCard />

            <div className="flex items-center">
              <input
                type="text"
                className="flex-grow my-4 mr-2 py-2 pl-2 rounded-md bg-slate-700"
                placeholder={inputPlaceholder}
                value={queryTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <select
                className="bg-slate-600 p-2 rounded-md my-4"
                value={copyType}
                onChange={handleOptionChange}
              >
                <option value="">Select Copy Type..</option>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleQuery}
                className="py-2 px-4 mx-2 rounded-md bg-slate-600"
              >
                Query
              </button>
            </div>
            <div>
              {currResults
                ? currResults.matches.map((data) => (
                    <VectorCard key={data.id} data={data} />
                  ))
                : null}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
