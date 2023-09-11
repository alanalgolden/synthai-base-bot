"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageRole, setMessageRole] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  const prevMessageRef = useRef();

  useEffect(() => {
    // This code will run whenever the 'message' state changes, but not trigger updates
    if (prevMessageRef.current !== message) {
      console.log("Message state updated:", message);
      prevMessageRef.current = message;
    }
  }, [message]);

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        messageRole,
        setMessageRole,
        lastMessage,
        setLastMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
