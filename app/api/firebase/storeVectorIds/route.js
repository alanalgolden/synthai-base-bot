import { doc, getDoc, setDoc } from "firebase/firestore";
import { produce } from "immer";
import { db } from "../../../../firebaseConfig";

export async function storeVectorIds(conversationId, vectorIds) {
  const docRef = doc(
    db,
    "cMm79WMhxwf2c0ERLOwChpwOKj93",
    `${conversationId}-vectors`
  );
  let docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const appendDoc = produce(docSnap.data(), (updatedDoc) => {
      updatedDoc.heldVectorIds = vectorIds;
    });

    const updatedDoc = await setDoc(docRef, appendDoc);
    return updatedDoc;
  } else {
    const createdDoc = setDoc(docRef, { heldVectorIds: vectorIds });
    return createdDoc;
  }
}
