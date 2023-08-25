import React from "react";
import PropTypes from "prop-types";
import Chat from "../../api/chat";

const ChatWindow = (props) => {
  return <Chat />;
};

ChatWindow.propTypes = {
  titleText: PropTypes.string.isRequired,
};

export default ChatWindow;