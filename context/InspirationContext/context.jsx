"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const InspirationContext = createContext();

export const useInspiration = () => {
  return useContext(InspirationContext);
};

export const InspirationProvider = ({ children }) => {
  const [inspiration, setInspiration] = useState(null);
  const [lastInspiration, setLastInspiration] = useState(null);

  const prevInspirationRef = useRef();

  useEffect(() => {
    // This code will run whenever the 'message' state changes, but not trigger updates
    if (prevInspirationRef.current !== inspiration) {
      console.log("Message state updated:", inspiration);
      prevInspirationRef.current = inspiration;
    }
  }, [inspiration]);

  return (
    <InspirationContext.Provider
      value={{
        inspiration,
        setInspiration,
        lastInspiration,
        setLastInspiration,
      }}
    >
      {children}
    </InspirationContext.Provider>
  );
};
