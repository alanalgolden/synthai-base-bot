import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export const useFirestoreDocument = (id) => {
  const [documentCache, setDocumentCache] = useState(null);

  useEffect(() => {
    // Check if we already have the document cached
    if (!documentCache) {
      const fetchData = async () => {
        const documentRef = doc(db, "cMm79WMhxwf2c0ERLOwChpwOKj93", id);
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
          setDocumentCache(documentSnapshot.data());
        }
      };
      fetchData();
    }
    console.log("USE EFFECT FIRESTORE DOC TRIGGERED");
  }, [id, documentCache]);

  return documentCache;
};
