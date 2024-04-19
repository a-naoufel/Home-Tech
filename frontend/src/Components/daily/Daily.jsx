import Product from "../Product/Product";
import { useEffect,useState } from "react";
import  axios  from "axios";
// eslint-disable-next-line react/prop-types
export default function Daily({ notification, setnotification }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      // Fetch product data from backend
      // Update state with fetched product data
      try {
        const response = await axios.get('http://example.com/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    
    }
    fetchProducts();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container  py-6">
      <div className="flex justify-center  ">
      <p className="border-b-4 px-5 border-mainColor pb-2 text-2xl font-bold  ">
        Daily
      </p>
      </div>
     
      <div className="my-12 flex flex-wrap justify-center gap-8  ">
       <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
      </div>
    </div>
  );
}
