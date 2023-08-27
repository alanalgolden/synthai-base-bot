import { db } from "../../../../firebaseConfig";
import { setDoc, collection, doc } from "firebase/firestore";

export async function upsertDoc(collectionId, docID, data) {
  // Date for timestamps
  const date = new Date();

  // Uses docId from docId prop
  const docId = docID;

  // Uses collection from the passed in collectionId
  const docCollection = collection(db, collectionId);

  // Uses docId and docCollection to form full string for setDoc
  const docDocument = doc(docCollection, docId);

  const conversationData = {
    doc,
    date: date.toISOString(),
    data,
  };

  // Attempt to create or update existing doc
  try {
    const docRef = await setDoc(docDocument, {
      data,
    });
    console.log("Document written with ID: ", docId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
