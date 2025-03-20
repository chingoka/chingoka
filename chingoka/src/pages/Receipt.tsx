// Receipt.tsx
import React from "react";

interface ReceiptProps {
  onFileChange: (file: File | null, preview: string | null) => void;
  errorMessage: string | null;
  receiptPreview: string | null;
}

const Receipt: React.FC<ReceiptProps> = ({ onFileChange, errorMessage, receiptPreview }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const preview = URL.createObjectURL(file);
      onFileChange(file, preview);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">Upload Receipt</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 w-full p-3 bg-gray-700 text-white rounded"
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {receiptPreview && <img src={receiptPreview} alt="Receipt Preview" className="mb-4" />}
    </div>
  );
};

export default Receipt;
