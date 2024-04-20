import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"

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
            <h1>HOME</h1>
        </div>
    );
}

export default Home;
