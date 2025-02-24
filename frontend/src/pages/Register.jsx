import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
    regNo: "",
    phoneNumber: ""
  });
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.confirmpassword === formData.password) {
        const response = await axios.post(
          // "http://127.0.0.1:5000/api/signup",
          "https://flask-authentication-2qax.onrender.com/api/signup",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        alert('Password doesn\'t not match')
        return;
      }

      alert("Registration successful");
      navigateTo("/");
    } catch (err) {
        console.log(err)
      alert("Error registering");
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="mt-6">
              <h2 className="text-3xl font-bold text-center">REGISTER</h2>
              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-lg">
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      First Name
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.firstName}
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      Last Name
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.lastName}
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Email</span>
                    <input
                      type="email"
                      name="email"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Phone Number</span>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.phoneNumber}
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Addess</span>
                    <input
                      type="text"
                      name="address"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Reg Numbers</span>
                    <input
                      type="text"
                      name="regNo"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.regNo}
                    />
                  </div>
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">Password</span>
                    <input
                      type="password"
                      name="password"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>

                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      Confirm Password
                    </span>
                    <input
                      type="password"
                      name="confirmpassword"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={handleChange}
                      value={formData.confirmpassword}
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                  >
                    Register
                  </button>
                </div>
              </form>
              <p className="text-center my-4">
                <Link
                  to={'/'}
                  className="text-gray-600 text-sm hover:underline"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
