import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

export async function getVectorIdsFromDb(docId, msgCount) {
  const docRef = doc(db, "cMm79WMhxwf2c0ERLOwChpwOKj93", `${docId}-vectors`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ids = docSnap.data().heldVectorIds;
    return { ...ids };
  } else {
    console.log("No such document!");
  }
  return vectors;
}
