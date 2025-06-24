import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./reduxStore/socketSlice";
import { setOnlineUsers } from "./reduxStore/userSlice";
import io from "socket.io-client";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const socketRef = useRef(null); // Store socket instance in a ref

  useEffect(() => {
    if (!authUser?._id) return;

    console.log("Initializing socket connection for user:", authUser._id);
    
    const socket = io("http://localhost:8080", {
      query: { userId: authUser._id },
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket; // Store socket in ref

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
      dispatch(setSocket(socket)); // Still dispatch but slice will only store ID
    });

    socket.on("getOnlineUsers", (users) => {
      console.log("Received online users:", users);
      dispatch(setOnlineUsers(users));
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      console.log("Cleaning up socket connection");
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [authUser?._id, dispatch]);


  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1620498590128-b780a069fdc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-7xl font-bold">404 Page Not Found</div>
    </div>
  );
}

export default App;
