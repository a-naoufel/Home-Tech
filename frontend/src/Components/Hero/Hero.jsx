import { useState } from "react";
import HeroProduct from "./HeroProduct";
import HeroSlider from "./HeroSlider";

// eslint-disable-next-line react/prop-types
export default function Hero({ notification, setnotification }) {
  const [slideIndex, setslideIndex] = useState(0);
  return (
    <div
      className=" relative bg-bgColorBlack overflow-hidden"
      style={{
        minHeight: "calc(100vh -30px)",
     

       }}
    >
      <HeroSlider slideIndex={slideIndex} setslideIndex={setslideIndex} />
      <div
        className="flex
         w-[400vw]  text-[white] duration-500 "
        style={{ transform: `translateX(${-100 * slideIndex}vw)` }}
      >
        <HeroProduct
          notification={notification}
          setnotification={setnotification}
        />
        <HeroProduct
          notification={notification}
          setnotification={setnotification}
        />
        <HeroProduct
          notification={notification}
          setnotification={setnotification}
        />
        <HeroProduct
          notification={notification}
          setnotification={setnotification}
        />
      </div>
    </div>
  );
}
