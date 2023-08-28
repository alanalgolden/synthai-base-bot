import React from "react";
import PropTypes from "prop-types";
import Chat from "../../app/api/chat/useChat";
import Sidebar from "./Sidebar";

const ChatWindow = (props) => {
  return (
    <div className="flex justify-center">
      <Chat />
    </div>
  );
};

ChatWindow.propTypes = {
  titleText: PropTypes.string.isRequired,
};

export default ChatWindow;
