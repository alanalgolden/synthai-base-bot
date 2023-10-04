"use client";

import React, { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

export const useConversation = () => {
  return useContext(ConversationContext);
};

export const ConversationProvider = ({ children }) => {
  const [conversation, setConversation] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  return (
    <ConversationContext.Provider
      value={{
        conversation,
        setConversation,
        conversationId,
        setConversationId,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
