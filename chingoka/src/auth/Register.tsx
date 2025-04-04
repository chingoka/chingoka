import { useState } from "react";

interface RegisterForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    firstName: "",
    middleName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Start loading
    setPopupVisible(true);

    // Clear form data immediately after the user clicks submit button
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      role: "employee",
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      setSuccess("Registration successful! Please verify your email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  return (
    <div className="min-h-screen mx-auto p-6 bg-white shadow-md rounded-lg relative mt-4">
      <h2 className="text-2xl font-bold mt-5 mb-4 text-[#023e93de] text-center">Register all user </h2>
      <p className="text-xl font-bold mt-5 mb-4 text-[#023e93de] text-center">only the registered user can access the system </p>

      {isPopupVisible && (error || success) && (
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 mt-15 w-150 p-4 rounded-lg shadow-lg ${error ? 'bg-red-500' : 'bg-green-500'}`}>
          <p className="text-white text-center">{error || success}</p>
          <button onClick={() => setPopupVisible(false)} className="mt-2 w-full bg-gray-800 text-white py-1 rounded">
            Close
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
            required
          />
        </div>

        <div>
          <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">Middle Name (Optional)</label>
          <input
            id="middleName"
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter your middle name (optional)"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter a password"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#023e93de] focus:border-[#023e93de]"
          >
            <option value="employee">Employee</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 rounded transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#023e93de] text-white hover:bg-[#015f8d]'}`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
