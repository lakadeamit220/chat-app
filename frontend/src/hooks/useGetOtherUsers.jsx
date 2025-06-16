import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../reduxStore/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  const fetchOtherUsers = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`http://localhost:8080/api/v1/user/users`);
      console.log("other users -> ", res);
      dispatch(setOtherUsers(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
