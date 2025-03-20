import React, { useState } from "react";

const DocumentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    sender: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Receipt Number is required";
    if (!formData.amount.trim()) newErrors.amount = "Amount Paid is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.sender.trim()) newErrors.sender = "Sender is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) return; // Stop submission if validation fails

    setLoading(true);


    try {
      const response = await fetch("http://127.0.0.1:8000/document/document-add/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              title: formData.title,
              amount: parseInt(formData.amount, 10),  // ✅ Ensure it's an integer
              description: formData.description,
              sender: formData.sender  
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
      if (!response.ok) {
        throw new Error("Failed to upload document");
      }

      setSuccess(true);
      setFormData({ title: "", amount: "", description: "", sender: "" });
      setErrors({});
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 shadow-md rounded-md mt-10 text-black">
      <h2 className="text-xl font-bold mb-4 text-[#023e93de]">Upload Document</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Document uploaded successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Receipt Number"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 mb-1 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount Paid"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 mb-1 border rounded"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description about product"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mb-1 border rounded"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <input
            type="text"
            name="sender"
            placeholder="Who brought the product"
            value={formData.sender}
            onChange={handleChange}
            className="w-full p-2 mb-1 border rounded"
          />
          {errors.sender && <p className="text-red-500 text-sm">{errors.sender}</p>}
        </div>

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
