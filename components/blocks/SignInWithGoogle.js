import React from "react";
import { googleSignIn } from "../../app/api/firebase/googleSignIn/route";
import { useUser } from "../../context/UserContext/context";

const GoogleSignInButton = () => {
  const { setUser } = useUser();
  const { user } = useUser();

  const handleSignIn = async () => {
    const user = await googleSignIn();
    if (user) {
      setUser(user);
    }
  };

  return (
    <>
      <button
        className="py-4 px-6 rounded-md font-extrabold bg-slate-600"
        onClick={handleSignIn}
      >
        Sign in
      </button>
    </>
  );
};

export default GoogleSignInButton;
