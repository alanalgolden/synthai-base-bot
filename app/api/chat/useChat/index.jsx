"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useMessage } from "../../../../context/MessageContext/context";
import ReactMarkdown from "react-markdown";
import { useInspiration } from "../../../../context/InspirationContext/context";
import { useConversation } from "../../../../context/ConversationContext/context";
import { v4 as uuidv4, v4 } from "uuid";
import { conversationLogger } from "../../firebase/conversationLogger/route";
import { pineconeFetch } from "../../../util/pineconeFetch/util";
import { getVectorIdsFromDb } from "../../../util/firebase/getVectorIdsFromDb/util";
import { produce } from "immer";

export default function Chat() {
  // IMPORTED CONTEXT
  const { setMessage } = useMessage();
  const { inspiration } = useInspiration();
  const { conversation, setConversation, conversationId, setConversationId } =
    useConversation();

  // CHAT CONFIG
  const placeholderConfig = "How can I help?";

  // REACT
  const [counter, setCounter] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [inspirationStrings, setInspirationStrings] = useState([
    "test",
    "test1",
    "test2",
    "test3",
    "test4",
  ]);

  // FUNCTIONS
  const toggleFinished = () => {
    setIsFinished(true);
  };

  const toggleWaiting = () => {
    setIsFinished(false);
  };

  const testFunction = async () => {
    const ids = await getVectorIdsFromDb(conversationId);
    const parsedIds = await parseIdsForPineconeFetch(ids);
    const gotIds = await pineconeFetch(parsedIds);
    console.log(gotIds);
    const vectorStrings = await transformVectorsToVectorStrings(gotIds);
    console.log(vectorStrings);
  };

  const manageSubmit = async (e) => {
    handleSubmit(e);
  };

  // CONVERSATION MANAGER
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: {
      conversationId: conversationId,
      messageCount: counter,
    },
    onFinish: toggleFinished,
  });

  // MICRO FUNCTIONS
  const parseIdsForPineconeFetch = async (ids) => {
    const idsArray = Object.values(ids);
    const joinedIds = idsArray.join("&ids=");
    return joinedIds;
  };

  async function transformVectorsToVectorStrings(data) {
    let result = {};

    for (let key in data.vectors) {
      let vector = data.vectors[key];

      result[vector.id] = {
        text: vector.metadata.input,
        type: vector.metadata.messageType,
      };
    }

    return { ...result };
  }

  // CONTROLS TEXT AREA SIZE
  const handleTextAreaChange = (e) => {
    handleInputChange(e);
    const lineHeight = 20; // Assume each line is approx 20px high. Adjust based on your styling
    const maxVisibleLines = 10;
    const currentLines = e.target.value.split("\n").length;

    // Set rows to the lesser of currentLines or maxVisibleLines
    e.target.rows = Math.min(currentLines, maxVisibleLines);
  };

  async function handleAssistant() {
    setMessage(messages[counter]);
    // Need to get the vectors
    const ids = await getVectorIdsFromDb(conversationId);
    const parsedIds = await parseIdsForPineconeFetch(ids);
    const retrievedVectors = await pineconeFetch(parsedIds);
    const vectors = await transformVectorsToVectorStrings(retrievedVectors);
    await conversationLogger(messages, conversationId, counter, vectors);
    setCounter((prevCounter) => prevCounter + 1);
    setIsFinished(false);
    console.log("IS FINISHED MESSAGES BELOW");
    console.log(messages);
  }

  // EFFECTS
  useEffect(() => {
    // Prevents infinite loop by not allowing function to run if messages[0] is still undefined.
    if (messages[counter]) {
      // LOGIC : If the user sent the message, then it doesn't need to wait for onFinished from text stream.
      if (messages[counter].role === "user") {
        setMessage(messages[counter]);
        setCounter((prevCounter) => prevCounter + 1);
      }
      // LOGIC : Prevents message from being set until it is fully finished, using the onFinish callback from chat stream.
      else if (messages[counter].role === "assistant" && isFinished === true) {
        handleAssistant();
      }
    }
  }, [messages, isFinished]);

  useEffect(() => {
    const uuid = uuidv4();
    setConversationId(uuid);
    console.log(uuid);
  }, []);

  // STYLING
  const markdownStyles = {
    h1: "text-2xl font-bold mb-2",
    h2: "text-xl font-bold mb-1",
    h3: "text-lg font-bold",
    h4: "text-base font-semibold",
    // Add more styles as needed
  };

  return (
    <div className="bg-slate-900 w-full flex justify-center   max-h-[80vh]">
      <div className="border-slate-500 border-4 rounded-md  mt-4 min-w-[30rem] w-[60rem] flex flex-col">
        <div className="flex-grow overflow-y-scroll">
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? (
                <div className="px-2 pt-2 pb-4 bg-slate-800 whitespace-pre-line">
                  <p className="text-blue-500">{"User: "}</p>
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h1} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className={markdownStyles.h2} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className={markdownStyles.h3} {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h4} {...props} />
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="pl-2 pt-2 pb-4 bg-slate-600 whitespace-pre-line">
                  <p className="text-green-500">{"AI: "}</p>
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h1} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className={markdownStyles.h2} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className={markdownStyles.h3} {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h1 className={markdownStyles.h4} {...props} />
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                  {inspirationStrings[counter] ? (
                    <div className="bg-slate-700 flex-col p-2 rounded-md mt-2">
                      <p className="text-blue-400">Inspiration Vectors:</p>
                      <div>{inspirationStrings[counter - 1]}</div>
                      <div>{inspiration}</div>
                    </div>
                  ) : undefined}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-500 px-4 ">
          <form onSubmit={manageSubmit} className="flex items-center">
            <textarea
              className="flex-grow my-4 py-2 pl-2 rounded-md bg-slate-700 overflow-auto max-h-[200px]"
              rows="1"
              value={input}
              placeholder={placeholderConfig}
              onChange={handleTextAreaChange}
              style={{ resize: "none" }}
            />
            {/* <span className="...">Press ⮐ to send</span> */}
            <button
              className="py-2 px-4 ml-2 rounded-md bg-slate-600"
              type="submit"
            >
              Send
            </button>
          </form>
          <button onClick={testFunction}>Test BUTTON</button>
        </div>
      </div>
    </div>
  );
}
