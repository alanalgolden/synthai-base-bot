import { auth } from "../../../../firebaseConfig";

export async function googleSignOut() {
  try {
    await auth.signOut();
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
