import { useEffect, useState } from "react";

interface Productdetail {
  id: number;
  title: string;
  amount: number; 
  description: string; 
  sender: string; 
  user:string;
  timestamp: string;
}

const ProductDetail = () => {
  const [productdetail, setProductdetail] = useState<Productdetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/document/document-list/`);
        if (!response.ok){
            throw new Error("Failed to fetch product detailed");
        }
        const data= await response.json();
        setProductdetail(data);
      } catch (error) {
        setError(error instanceof Error? error.message:"Error fetching user products detail:");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5 mx-auto p-4">
      <h2 className="text-2xl font-semibold mt-10 text-[#023e93de]">The detail of all product Uploaded</h2>
      <p className="font-semibold mb-4 mt-10 text-[#023e93de]">if there an issue check more description</p>
      {loading ? (
        <p>Loading product detail...</p>
      ) :error?  (
        <p className="text-black">No products detailed uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {productdetail.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg shadow bg-blue-200 text-black">
              <h3 className="text-xl font-bold text-black">Receipt Number:{product.title}</h3>
              <p>Quantity: {product.amount}</p>
              <p>Description: {product.description}</p>
              <p>Sender: {product.sender}</p>
              <p>Uploaded by: {product.user}</p>
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

export default ProductDetail;


