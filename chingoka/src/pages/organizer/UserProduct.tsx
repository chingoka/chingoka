import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string; 
  quantity: number;
  size: string; 
  store: string; 
  user:string;
  timestamp: string;
}

const UserProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/product/list/`);
        if (!response.ok){
            throw new Error("Failed to fetch product");
        }
        const data= await response.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error? error.message:"Error fetching user products:");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5 mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 mt-10 text-[#023e93de]">My Uploaded Products</h2>
      {loading ? (
        <p>Loading product...</p>
      ) :error?  (
        <p className="text-black">No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {products.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg shadow bg-blue-200 text-black">
              <h3 className="text-xl font-bold text-black">{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Size: {product.size}</p>
              <p>Store: {product.store}</p>
              <p>User uploaded: {product.user}</p>
              <p className="text-sm text-gray-500">
                Uploaded on: {new Date(product.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProduct;


