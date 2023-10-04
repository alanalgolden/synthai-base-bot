import { doc, getDoc } from "firebase/firestore";
import { produce } from "immer";
import { db } from "../../../../firebaseConfig";

export async function getVectorIdsFromDb(conversationId, msgCount) {
  const docRef = doc(
    db,
    "cMm79WMhxwf2c0ERLOwChpwOKj93",
    `${conversationId}-vectors`
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ids = docSnap.data().heldVectorIds;
    return { ...ids };
  } else {
    console.log("No such document!");
  }
  return vectors;
}
