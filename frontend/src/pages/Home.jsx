import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Product from "../components/Product/Product";

function Home() {
    const [products , setProducts] = useState([]);
    const [content, setContent] = useState("")
    const [name , setName] = useState("")
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = () => {
        api
        .get("/api/products/")
        .then((res) => res.data)
        .then((data) => {setProducts(data); console.log(data)})
        .catch((err) => alert(err));
    }

    return (
        <div>
            <Header />
            <div className="home">
                <h1>Products</h1>
                <div className="products">
                    {products.map((product) => (
                      
                      <div className="product" key={product._id}>
                            
                            <Link to={`/product/${product._id}`}>
                                <h3>{product.name}</h3>
                                <Product product={product}/>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
