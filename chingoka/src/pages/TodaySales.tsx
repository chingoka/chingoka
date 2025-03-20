import React, { useState } from "react";

const TodaySales: React.FC = () => {
  interface Sale {
    productName: string;
    category: string;
    quantity: string;
    price: string;
    discount: string;
    total: number;
    errors: {
      productName?: boolean;
      quantity?: boolean;
      price?: boolean;
    };
  }

  const [sales, setSales] = useState<Sale[]>([
    { productName: "", category: "set", quantity: "", price: "", discount: "", total: 0, errors: {} },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSalesChange = <K extends keyof Sale>(
    index: number,
    field: K,
    value: string
  ) => {
    const updatedSales = [...sales];

    if (field === "quantity" || field === "price" || field === "discount") {
      const quantity = parseFloat(updatedSales[index].quantity) || 0;
      const price = parseFloat(updatedSales[index].price) || 0;
      const discount = parseFloat(updatedSales[index].discount) || 0;
      
      updatedSales[index].total = Math.max(0, (quantity * price) - discount); // Ensure total is not negative
    }

    updatedSales[index][field] = value as any;
    setSales(updatedSales);
  };

  const addSale = () => {
    setSales([...sales, { productName: "", category: "set", quantity: "", price: "", discount: "", total: 0, errors: {} }]);
  };

  const removeSale = (index: number) => {
    const updatedSales = sales.filter((_, i) => i !== index);
    setSales(updatedSales);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const updatedSales = sales.map((sale) => {
      const errors = {
        productName: !sale.productName,
        quantity: !sale.quantity,
        price: !sale.price,
      };
      if (Object.values(errors).some((error) => error)) isValid = false;
      return { ...sale, errors };
    });

    setSales(updatedSales);

    if (isValid) {
      setModalMessage("Sales submitted successfully!");
    } else {
      setModalMessage("Failed to submit sales. Please fill in all required fields.");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Today's Sales</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        {sales.map((sale, index) => (
          <div key={index} className="mb-4 border-b border-gray-600 pb-4">
            <h3 className="text-lg font-medium mb-2">Sale {index + 1}</h3>

            {/* Product Name */}
            <input
              type="text"
              value={sale.productName}
              onChange={(e) => handleSalesChange(index, "productName", e.target.value)}
              className={`w-full p-2 mb-2 bg-gray-700 text-white rounded-lg border ${sale.errors.productName ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter Product Name"
            />
            {sale.errors.productName && <p className="text-red-500 text-sm">Product Name is required</p>}

            {/* Category */}
            <select
              value={sale.category}
              onChange={(e) => handleSalesChange(index, "category", e.target.value)}
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400"
            >
              <option value="set">Set</option>
              <option value="set">mita</option>
              <option value="box">Box</option>
              <option value="bandru">Bandru</option>
            </select>

            {/* Quantity */}
            <input
              type="number"
              value={sale.quantity}
              onChange={(e) => handleSalesChange(index, "quantity", e.target.value)}
              className={`w-full p-2 mb-2 bg-gray-700 text-white rounded-lg border ${sale.errors.quantity ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter Quantity"
            />
            {sale.errors.quantity && <p className="text-red-500 text-sm">Quantity is required</p>}

            {/* Price */}
            <input
              type="number"
              value={sale.price}
              onChange={(e) => handleSalesChange(index, "price", e.target.value)}
              className={`w-full p-2 mb-2 bg-gray-700 text-white rounded-lg border ${sale.errors.price ? 'border-red-500' : 'border-gray-600'} focus:ring-2 focus:ring-blue-400`}
              placeholder="Enter Price"
            />
            {sale.errors.price && <p className="text-red-500 text-sm">Price is required</p>}

            {/* Discount (Optional) */}
            <input
              type="number"
              value={sale.discount}
              onChange={(e) => handleSalesChange(index, "discount", e.target.value)}
              className="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Discount (Optional)"
            />

            {/* Total (Auto-Calculated) */}
            <input
              type="text"
              value={sale.total.toFixed(2)}
              readOnly
              className="w-full p-2 mb-2 bg-gray-700 text-gray-400 rounded-lg border border-gray-600"
            />

            {/* Remove Sale */}
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeSale(index)}
                className="text-red-400 hover:text-red-500 mt-2"
              >
                Remove Sale
              </button>
            )}
          </div>
        ))}

        {/* Add More Sales */}
        <button
          type="button"
          onClick={addSale}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-all mb-4"
        >
          + Add More Sales
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-all"
        >
          Submit Sales
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4 text-center">{modalMessage}</h3>
            <button
              onClick={closeModal}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaySales;
