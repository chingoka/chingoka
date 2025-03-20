import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/login/",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      sessionStorage.setItem("token", response.data.user.access);
      sessionStorage.setItem("refreshToken", response.data.user.refresh);
      sessionStorage.setItem("role", response.data.user.role);
      sessionStorage.setItem("id", response.data.user.id);
      sessionStorage.setItem("username", response.data.user.username);

      const role = response.data.user.role;

      if (role === "organizer") {
        navigate("/dashboard");
      } else if (role === "employee") {
        navigate("/employee");
      } else if (role === "admin") {
        navigate("/dashboard");
      } else {
        setErrorMessage(response.data.error || "Unauthorized.");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage("Invalid credentials.");
          } else if (error.response.status === 401) {
            setErrorMessage(error.response.data.error || "Unauthorized.");
          } else {
            setErrorMessage("Unexpected error. Please try again.");
          }
        } else {
          setErrorMessage("Network error. Please check your connection.");
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-2xl shadow-2xl">
        {/*  Add an Image Here */}
        {/* <div className="flex justify-center mb-4">
          <img
            src="src/assets/logo/chingokabg.png"  
            alt="Login"
            className="w-32 h-32 object-cover"
          />
        </div> */}

        <p className="mt-2 text-lg text-gray-600 text-center">
          Login to manage your warehouse inventory efficiently.
        </p>

        {errorMessage && (
          <p className="mt-4 text-center text-red-500 text-sm">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin} className="mt-6 flex flex-col space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className={`mt-1 w-full rounded-lg border p-3 text-gray-700 focus:ring-2 ${
                usernameError ? "border-red-500" : "border-gray-300"
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="current-password"
            />
            {usernameError && (
              <p className="mt-1 text-sm text-red-500">{usernameError}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-base font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`mt-1 w-full rounded-lg border p-3 text-gray-700 focus:ring-2 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          {/* <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a> */}
        </p>
      </div>
    </div>
  );
}
