import React from "react";
import { googleSignOut } from "../../app/api/firebase/googleSignOut/googleSignOut";
import { useUser } from "../../context/UserContext/context";

const LogoutButton = () => {
  const { setUser } = useUser();

  const handleSignOut = async () => {
    await googleSignOut();
    setUser(null); // Reset the global user state to null after signing out
  };

  return (
    <button
      className="py-4 px-6 rounded-md font-extrabold bg-red-600"
      onClick={handleSignOut}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
