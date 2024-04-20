import Product from "../Product/Product";
import { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line react/prop-types
export default function Daily({ notification, setnotification }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8000/api/products/"; // Manually input API URL
    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("Fetched products:", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  },  [products]);

  if (loading)   {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container py-6">
      <div className="flex justify-center ">
        <p className="border-b-4 px-5 border-mainColor pb-2 text-2xl font-bold ">
          Daily
        </p>
      </div>

      <div className="my-12 flex flex-wrap justify-center gap-8 ">
        {products.map((product) => (
          <>
            <Product
              key={product.id}
              setnotification={setnotification}
              notification={notification}
              product={product} // Pass product details here
            />
          </>
        ))}
      </div>
    </div>
  );
}