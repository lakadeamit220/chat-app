import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
    setErrors({ ...errors, gender: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Full Name validation
    if (!user.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    } else {
      newErrors.fullName = "";
    }

    // Username validation
    if (!user.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (user.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
      valid = false;
    } else {
      newErrors.username = "";
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (user.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    // Confirm Password validation
    if (!user.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const requestData = {
          fullName: user.fullName,
          username: user.username,
          confirmPassword: user.confirmPassword,
          password: user.password,
          gender: user.gender,
        };

        const response = await axios.post(
          "http://localhost:8080/api/v1/user/register",
          JSON.stringify(requestData),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "Signup error:",
          error.response?.data?.message || error.message
        );
        alert(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl mx-auto p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-4">
        <h1 className="text-3xl font-bold text-center text-white">SignUp</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => {
                setUser({ ...user, fullName: e.target.value });
                setErrors({ ...errors, fullName: "" });
              }}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>
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
          <div>
            <label className="label p-2">
              <span className="text-base text-white label-text">
                Confirm Password
              </span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => {
                setUser({ ...user, confirmPassword: e.target.value });
                setErrors({ ...errors, confirmPassword: "" });
              }}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p className="text-white">Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p className="text-white">Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                className="checkbox mx-2"
              />
            </div>
          </div>
          <p className="text-center text-white my-2">
            Already have an account? <Link to="/login"> login </Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-200"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
