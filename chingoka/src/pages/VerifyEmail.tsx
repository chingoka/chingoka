import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setErrorMessage("Invalid verification link.");
      setLoading(false);
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/verify-email/`,
        { token },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccessMessage(response.data.message);
      setErrorMessage("");

      setTimeout(() => {
        // navigate(response.data.redirect_url || "/login");
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage("Verification failed. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-900">Email Verification</h2>
        {loading ? (
          <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {successMessage && (
              <p className="text-green-600 mt-4">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
