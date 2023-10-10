import {
  collection,
  doc,
  getDoc,
  getDocFromServer,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../../firebaseConfig";
import { produce } from "immer";

export async function conversationLogger(message, uuid, msgCount, vectors) {
  const date = new Date();
  const data = {
    created: date,
    messages: {
      ...message,
    },
  };

  const docCollection = collection(db, "cMm79WMhxwf2c0ERLOwChpwOKj93");
  const docDocument = doc(docCollection, uuid);
  const docRef = doc(db, "cMm79WMhxwf2c0ERLOwChpwOKj93", uuid);

  try {
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Get most recent snapshot
      docSnap = await getDoc(docRef);

      // Update the conversation with the new messages
      const appendDoc = produce(docSnap.data(), (updatedDoc) => {
        updatedDoc.messages[msgCount - 1] = data.messages[msgCount - 1];
        updatedDoc.messages[msgCount] = data.messages[msgCount];
      });
      await setDoc(docDocument, appendDoc);

      // Get the appended doc
      docSnap = await getDoc(docRef);
      console.log("DOCSNAP DATA");
      console.log(docSnap.data());

      // Immer produce message with vectors added
      const appendVectors = produce(docSnap.data(), (updatedAiMsg) => {
        console.log("AI MSG");
        console.log(updatedAiMsg);
        updatedAiMsg.messages[msgCount].vectors = vectors;
      });

      const updatedConversation = await setDoc(docDocument, appendVectors);

      return updatedConversation;
    } else {
      console.log("No such document! Creating... ");
      const createdConversation = await setDoc(docDocument, data);
      console.log(`Doc with ID: ${uuid} created!`);

      // Get the newly created document
      docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      // Immer produce message with Vectors added
      const appendVectors = produce(docSnap.data(), (updatedAiMsg) => {
        console.log("AI MSG");
        console.log(updatedAiMsg);
        updatedAiMsg.messages[msgCount].vectors = vectors;
      });

      await setDoc(docDocument, appendVectors);

      return createdConversation;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function createConversation(conversationId) {
  const docRef = doc(db, "cMm79WMhxwf2c0ERLOwChpwOKj93", conversationId);
  let docSnap = await getDoc(docRef);
  const date = new Date();

  if (docSnap.exists()) {
    console.log("Document already exists!");
    return;
  } else {
    const createdDoc = await setDoc(docRef, { created: date });
    console.log("Doc created with id: " + conversationId);
    return createdDoc;
  }
}
