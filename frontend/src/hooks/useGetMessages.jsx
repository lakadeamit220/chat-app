import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../reduxStore/messageSlice";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchMessages = async () => {
    if (!selectedUser?._id) return; // Early return if no user selected

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `http://localhost:8080/api/v1/message/${selectedUser._id}`
      );
      dispatch(setMessages(res.data));
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedUser?._id]); // Removed setMessages as it's stable

  // Return the function if you want to allow manual refreshing
  return { fetchMessages };
};

export default useGetMessages;
