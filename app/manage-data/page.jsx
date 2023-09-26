"use client";

import { useState } from "react";
import Footer from "../../components/blocks/Footer";
import InfoCard from "../../components/static/InfoCard";
import getEmbeddings from "../api/openai/getEmbeddings/route";
import { pineconeUpsert } from "../util/pineconeUpsert/util";

export default function ManageData() {
  const inputPlaceholder = "Enter text data...";
  const messageType = "userSubmitted";
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "heading", label: "Heading" },
    { value: "cta", label: "Call To Action" },
    { value: "slogan", label: "Slogan" },
    { value: "about", label: "About" },
    { value: "body", label: "Body" },
  ];

  async function handleClick() {
    const embeddings = await getEmbeddings(inputValue);
    console.log(embeddings);
    await pineconeUpsert(inputValue, embeddings, messageType, selectedOption);
    setInputValue("");
    setSelectedOption("");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
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
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <select
                className="bg-slate-600 p-2 rounded-md mx-2"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="">Select Copy Type..</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleClick}
                className="py-2 px-4 mx-2 rounded-md bg-slate-600"
              >
                Send
              </button>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
