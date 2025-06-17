import Message from "./Message";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const Messages = () => {
  useGetMessages();
  const { messages } = useSelector((store) => store.message);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages?.length > 0 ? (
        messages.map((message) => {
          // Add null check for message and message._id
          if (!message || !message._id) return null;
          return <Message key={message._id} message={message} />;
        })
      ) : (
        <div className="text-center text-gray-400 mt-4">
          No messages yet. Start a conversation!
        </div>
      )}
    </div>
  );
};

export default Messages;
