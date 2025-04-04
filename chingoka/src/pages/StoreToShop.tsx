import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Product {
  name: string;
  category: number;  // ID of the category
  size: number;  // ID of the size
  quantity: number;
  store: number;  // ID of the store
  user: string;  // Logged-in user's username or ID
}

const StoreToShop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { name: "", category: 0, size: 0, quantity: 0, store: 0, user: "" },
  ]);

  const [categoriesAndSizes, setCategoriesAndSizes] = useState<{
    categories: { id: number; name: string }[];
    sizes: { id: number; name: string }[];
    stores: { id: number; name: string }[];
  }>({ categories: [], sizes: [], stores: [] });

  const [username, setUsername] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setIsModalOpen] = useState(false);
  const [, setModalMessage] = useState<{ type: string; message: string }>({ type: "", message: "" });

  // Fetch username from session or authentication
  useEffect(() => {
    fetch("http://127.0.0.1:8000/auth/user/", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsername(data.username))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  // Fetch categories, sizes, and stores
  useEffect(() => {
    fetch("http://127.0.0.1:8000/product/category_size/")
      .then((res) => res.json())
      .then((data) => setCategoriesAndSizes(data))
      .catch((err) => console.error("Error fetching categories and sizes:", err));
  }, []);

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    setProducts((prev) => {
      const updatedProducts = [...prev];
      updatedProducts[index] = { ...updatedProducts[index], [field]: value };
      return updatedProducts;
    });
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      { name: "", category: 0, size: 0, quantity: 0, store: 0, user: username || "" },
    ]);
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
      setModalMessage({ type: "error", message: "Invalid data. Please correct the errors." });
      setIsModalOpen(true);
      return;
    }
  
    if (!username) {
      setModalMessage({ type: "error", message: "User not authenticated." });
      setIsModalOpen(true);
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/product/product/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`, // Using sessionStorage for auth token
        },
        credentials: "include",
        body: JSON.stringify({
          products: products.map((product) => ({
            ...product,
            user: username, // Include logged-in user's username
            // No need to include timestamp; the backend will handle it automatically
          })),
        }),
      });
  
      const data = await response.json();
      console.log(data); // Check the response from the server
  
      if (response.ok) {
        setModalMessage({ type: "success", message: "Product added successfully!" });
        setProducts([{ name: "", category: 0, size: 0, quantity: 0, store: 0, user: username || "" }]);
        setErrors({});
      } else {
        setModalMessage({ type: "error", message: `Error: ${JSON.stringify(data)}` });
      }
    } catch (error) {
      setModalMessage({ type: "error", message: "An error occurred while submitting the form." });
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }
  };
  
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6 mt-9">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-6">
        Add Product to Store
      </motion.h2>

      <h3 className="text-center text-lg mb-4">Welcome, {username ? username : "Guest"}</h3>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        {products.map((product, index) => (
          <div key={index} className="mb-6">
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleProductChange(index, "name", e.target.value)}
              placeholder="Product Name"
              className="w-full p-3 mb-2 bg-gray-700 text-white rounded"
            />
            {errors[`name${index}`] && <p className="text-red-500">{errors[`name${index}`]}</p>}

            <select
              value={product.category}
              onChange={(e) => handleProductChange(index, "category", Number(e.target.value))}
              className="w-full p-3 mb-2 bg-gray-700 text-white rounded"
            >
              <option value={0}>Select Category</option>
              {categoriesAndSizes.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
              placeholder="Quantity"
              className="w-full p-3 mb-2 bg-gray-700 text-white rounded"
            />

            <select
              value={product.size}
              onChange={(e) => handleProductChange(index, "size", Number(e.target.value))}
              className="w-full p-3 mb-2 bg-gray-700 text-white rounded"
            >
              <option value={0}>Select Size</option>
              {categoriesAndSizes.sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>

            <select
              value={product.store}
              onChange={(e) => handleProductChange(index, "store", Number(e.target.value))}
              className="w-full p-3 mb-2 bg-gray-700 text-white rounded"
            >
              <option value={0}>Select Store</option>
              {categoriesAndSizes.stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="button" onClick={addProduct} className="w-full bg-blue-600 py-3 rounded mb-4">
          Add More
        </button>
        <button type="submit" className="w-full py-3 mt-4 rounded bg-green-600" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default StoreToShop;
