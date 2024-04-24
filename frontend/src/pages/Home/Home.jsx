import Hero from "../../Components/Hero/Hero";

import { useState } from "react";
import { Featured } from "../../Components/featuerd/Featured";
import { NewsLetter } from "../../Components/news-letter/NewsLetter";
import { Products } from "../../Components/products-shopy/Products";

export default function Home() {
  const [notification, setnotification] = useState(0);

  return (
    <>
      {/* disabled */}
        
      <Hero />
     
      <div className="bg-bgColorWhite ">
      <Featured />
        <Products/>
      </div>
      <NewsLetter />
    </>
  );
}
