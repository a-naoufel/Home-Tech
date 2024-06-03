import Hero from "../../Components/Hero/Hero";
import React from "react";
import { Featured } from "../../Components/featuerd/Featured";
import { Products } from "../../Components/products-shopy/Products";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <div className="bg-bgColorWhite ">
        <Products />
      </div>
    </>
  );
}
