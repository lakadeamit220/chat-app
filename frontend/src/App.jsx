import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1620498590128-b780a069fdc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
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
