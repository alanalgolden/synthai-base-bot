import { db } from "../../../../firebaseConfig";
import { setDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

export async function upsertDoc(collectionId, docID, data) {
  // Date for timestamps
  const date = new Date();

  // Uses docId from docId prop
  const docId = docID;

  // Uses collection from the passed in collectionIdc
  const docCollection = collection(db, collectionId);

  // Uses docId and docCollection to form full string for setDoc
  const docDocument = doc(docCollection, docId);

  // Gets a snapshot of doc, if it exists
  //const docSnap = await getDoc(docDocument);
  //console.log("docSnap: " + docSnap);

  /*   if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    try {
      const docUpdate = await updateDoc(docCollection, {
        dateUpdated: date,
        ...data,
      });
    } catch (e) {
      console.log("FAILING AT UPDATEDOC" + e);
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
 */
  try {
    // Attempt to create doc
    const docRef = await setDoc(docDocument, {
      dateCreated: date,
      ...data,
    });
    console.log("Document written with ID: ", docId);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  //}
}
