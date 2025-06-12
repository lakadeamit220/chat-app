import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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

    if (validateForm()) {
      console.log("Form submitted:", user);
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-4">
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
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
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;