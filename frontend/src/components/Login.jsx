import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Username validation
    if (!user.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else {
      newErrors.username = "";
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        user,
        {
          withCredentials: true, // Important for cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful login
      console.log("Login successful:", response.data);
      
      // Store user data in local storage or context
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // Redirect to home page or dashboard
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setLoginError(error.response.data.message || "Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        setLoginError("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setLoginError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-4">
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
        
        {loginError && (
          <div className="alert alert-error my-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{loginError}</span>
          </div>
        )}
        
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
                setErrors({ ...errors, username: "" });
              }}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <p className="text-center text-white my-2">
            Don't have an account? <Link to="/register"> Signup </Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-200"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;