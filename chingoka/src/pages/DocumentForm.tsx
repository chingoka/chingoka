import React, { useState, useEffect } from "react";

const DocumentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    sender: "",
    user: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  useEffect(() => {
    // Ensure execution on client-side
    const storedUserId = sessionStorage.getItem("id");
    const storedUserName = sessionStorage.getItem("username");
    console.log(storedUserId)
    if (storedUserId) {
      setFormData((prevData) => ({
        ...prevData,
        user: storedUserId, // Store user ID in form data
      }));
    } else {
      setError("User is not logged in.");
    }

    if (storedUserName) {
      setUserName(storedUserName); // Store username for display
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    console.log(formData)
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Receipt Number is required";
    if (!formData.amount.trim()) newErrors.amount = "Amount Paid is required";
    if (!formData.description.trim())newErrors.description = "Description is required";
    if (!formData.sender.trim()) newErrors.sender = "Sender is required";
    if (!formData.user) newErrors.user = "User must be logged in";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
console.log(userName)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    console.log(userName)
    if (!formData.user) {
      setError("User must be logged in to upload a document.");
      return;
    }

    if (!validateForm()) {
      return setError("Please enter valid data before submitting.");
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/document/document-add/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: formData.user,
            title: formData.title,
            amount: parseInt(formData.amount, 10),
            description: formData.description,
            sender: formData.sender,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || "Failed to upload document");

      setSuccess(true);
      setModalMessage("Document uploaded successfully!");
      setFormData({
        title: "",
        amount: "",
        description: "",
        sender: "",
        user: formData.user,
      });
      setErrors({});
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      setModalMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
      setTimeout(() => setModalMessage(null), 3000);
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 shadow-md rounded-md mt-10 text-black">
      <h2 className="text-xl font-bold mb-4 text-[#023e93de]">
        Upload Document
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{error}</p>}
      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3 text-center">
            <p className="text-lg">{modalMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setModalMessage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Receipt Number"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        <input
          type="number"
          name="amount"
          placeholder="Amount Paid"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        <textarea
          name="description"
          placeholder="Description about product"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        <input
          type="text"
          name="sender"
          placeholder="Name of the one who brought the product"
          value={formData.sender}
          onChange={handleChange}
          className="w-full p-2 mb-1 border rounded"
        />
        {errors.sender && <p className="text-red-500 text-sm">{errors.sender}</p>}
        <input type="hidden" name="user" value={formData.user} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
    </div>
  );
};

export default DocumentForm;
