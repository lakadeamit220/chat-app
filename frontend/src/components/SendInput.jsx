import { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../reduxStore/messageSlice"; // Import addMessage instead of setMessages

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  
  // No longer need to get messages from store since we're using addMessage

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser?._id) return;

    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data?.newMessage) {
        dispatch(addMessage(res.data.newMessage)); // Use addMessage instead
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setMessage("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;