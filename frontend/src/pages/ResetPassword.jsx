import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true)

    console.log(email)
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/request-reset-password",
        {email},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer: ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false)
      setMessage(response.data.message);
    } catch (err) {
      setLoading(false)
      setError("Failed to send reset link. Please try again.");
    }
  };

  

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="mt-6">
              <h2 className="text-3xl font-bold text-center">Reset Password</h2>
              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="mx-auto max-w-lg">
                  <div className="py-2">
                    <span className="px-1 text-sm text-gray-600">
                      Email Address
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                  >
                    Send Reset Link
                  </button>
                  {loading && <p className="text-black mt-2">Sending.Please wait</p>}
                  {message && <p className="text-green-600 mt-2">{message}</p>}
                  {error && <p className="text-red-600 mt-2">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
