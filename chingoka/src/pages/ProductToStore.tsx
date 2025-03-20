import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const user = sessionStorage.getItem("id") || ""; // Ensure user is always a string

interface Product {
  name: string;
  category: number;
  size: number;
  quantity: number;
  store: number;
  user: number;
}

const ProductToStore: React.FC = () => {
  // console.log("user", user);
  const [products, setProducts] = useState<Product[]>([
    { name: "", category: 0, size: 0, quantity: 0, store: 0, user: parseInt(user) || 0 }
  ]);
  const [categoriesAndSizes, setCategoriesAndSizes] = useState<{ categories: { id: number, name: string }[], sizes: { id: number, name: string }[], store: { id: number, name: string }[] }>({ categories: [], sizes: [], store: [] });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<{ type: string, message: string }>({ type: '', message: '' });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/product/category_size/")
      .then((res) => res.json())
      .then((data) => setCategoriesAndSizes(data))
      .catch((err) => console.error("Error fetching categories and sizes:", err));
  }, []);

  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    setProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [field]: field === "category" || field === "size" || field === "store" || field === "quantity" ? parseInt(value) || 0 : value,
        user: parseInt(user) || 0
      };
      return updatedProducts;
    });
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { name: "", category: 0, size: 0, quantity: 0, store: 0, user: parseInt(user) || 0 }]);
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    products.forEach((product, index) => {
      if (!product.name) newErrors[`name${index}`] = "Product Name is required.";
      if (!product.category) newErrors[`category${index}`] = "Category is required.";
      if (!product.size) newErrors[`size${index}`] = "Size is required.";
      if (!product.quantity) newErrors[`quantity${index}`] = "Quantity is required.";
      if (!product.store) newErrors[`store${index}`] = "Store is required.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setModalMessage({ type: 'error', message: 'Invalid data. Please correct the errors.' });
      setIsModalOpen(true);
      return;
    }
    setIsSubmitting(true);
    // console.log("Products being sent:", products);

    try {
      // Loop through each product and send them individually
      for (const product of products) {
        const response = await fetch("http://127.0.0.1:8000/product/add/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product), // Send one product at a time
        });
        const data = await response.json();
        if (response.ok) {
          setModalMessage({ type: 'success', message: 'Product added successfully!' });
        } else {
          setModalMessage({ type: 'error', message: `Error: ${JSON.stringify(data)}` });
          setModalMessage({ type: 'error', message: `Error: submission failed please try again` });
        }
      }
      setProducts([{ name: "", category: 0, size: 0, quantity: 0, store: 0, user: parseInt(user) || 0 }]);
      setErrors({});
    } catch (error) {
      setModalMessage({ type: 'error', message: 'An error occurred while submitting the form.' });
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 mt-9"  style={{ backgroundColor: "var(--color-gray-100)" }}>
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-6 text-[#023e93de]">
        Add Product to Store
      </motion.h2>
      <form onSubmit={handleSubmit} className="bg-gray-300 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        {products.map((product, index) => (
          <div key={index} className="mb-6">
            <input type="text" value={product.name} onChange={(e) => handleProductChange(index, "name", e.target.value)} placeholder="Product Name" className="w-full p-3 mb-2 bg-white text-gray-500 rounded" />
            {errors[`name${index}`] && <p className="text-red-500">{errors[`name${index}`]}</p>}
            <select value={product.category} onChange={(e) => handleProductChange(index, "category", e.target.value)} className="w-full p-3 mb-2 bg-white text-gray-500 rounded">
              <option value="">Select Category</option>
              {categoriesAndSizes.categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>{category.name}</option>
              ))}
            </select>
            {errors[`category${index}`] && <p className="text-red-500">{errors[`category${index}`]}</p>}

            <input type="number" value={product.quantity} onChange={(e) => handleProductChange(index, "quantity", e.target.value)} placeholder="Quantity" className="w-full p-3 mb-2 bg-white text-gray-500 rounded" />
            {errors[`quantity${index}`] && <p className="text-red-500">{errors[`quantity${index}`]}</p>}
            
            <select value={product.size} onChange={(e) => handleProductChange(index, "size", e.target.value)} className="w-full p-3 mb-2 bg-white text-gray-500 rounded">
              <option value="">Select Size</option>
              {categoriesAndSizes.sizes.map((size) => (
                <option key={size.id} value={size.id}>{size.name}</option>
              ))}
            </select>
            {errors[`size${index}`] && <p className="text-red-500">{errors[`size${index}`]}</p>}

            <select value={product.store} onChange={(e) => handleProductChange(index, "store", e.target.value)} className="w-full p-3 mb-2 bg-white text-gray-500 rounded">
              <option value="">Select Store</option>
              {categoriesAndSizes.store.map((store) => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
            {errors[`store${index}`] && <p className="text-red-500">{errors[`store${index}`]}</p>}
          </div>
        ))}
        <button type="button" onClick={addProduct} className="w-full bg-blue-600 py-3 rounded mb-4">Add More</button>
        <button type="submit" className="w-full py-3 mt-4 rounded bg-green-600" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
      </form>
      {isModalOpen && (
        <div className="modal bg-gray-800 p-4 rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 text-white">
          <p className={modalMessage.type === 'success' ? "text-green-500" : "text-red-500"}>{modalMessage.message}</p>
          <button className="mt-4 w-full bg-blue-500 py-2 rounded" onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductToStore;
