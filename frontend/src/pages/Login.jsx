import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const handelChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // `http://127.0.0.1:5000/api/login`,
        'https://flask-authentication-2qax.onrender.com/api/login',
        credentials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      alert("Login success");
      navigateTo("/dashboard");
    } catch (err) {
      alert("Error loging in");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="mt-6">
              <h2 className="text-3xl font-bold text-center">LOGIN</h2>
              <form className="mt-8">
                <div className="mx-auto max-w-lg">
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Username</span>
                    <input
                      type="text"
                      name="email"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handelChange}
                      value={credentials.email}
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Password</span>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                        onChange={handelChange}
                        value={credentials.password}
                      />
                     
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <label className="block text-gray-500 font-bold my-4">
                      <input
                        type="checkbox"
                        className="leading-loose text-pink-600"
                      />
                      <span className="py-2 text-sm text-gray-600 leading-snug">
                        {" "}
                        Remember Me{" "}
                      </span>
                    </label>
                    <label className="block text-gray-500 font-bold my-4">
                      <Link
                        to={'/reset-password'}
                        className="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"
                      >
                        <span>Forgot Password?</span>
                      </Link>
                    </label>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                  >
                    Login
                  </button>
                </div>
                <div className="text-center py-3">Don't have an account <Link to={'/register'} className="text-blue-600">Sign up</Link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
