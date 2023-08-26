import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebaseConfig";

export async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;
    console.log("Signed in user:", user);
  } catch (error) {
    console.error("Error signing in:", error);
  }
}
