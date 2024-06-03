import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const emptyArray = [];
for (let i = 0; i < 3; i++) {
  emptyArray.push(i);
}

function HeroSlider({ slideIndex, setslideIndex }) {
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next slide index
      const nextSlideIndex = (slideIndex + 1) % emptyArray.length;
      // Set the next slide index
      setslideIndex(nextSlideIndex);
    }, 3000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [slideIndex, setslideIndex]);

  return (
    <div className="absolute w-[100vw] h-full">
      <button
        className="bg-white text-black absolute left-12 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed"
        onClick={() => {
          // Calculate the previous slide index
          const previousSlideIndex = slideIndex === 0 ? emptyArray.length - 1 : slideIndex - 1;
          // Set the previous slide index
          setslideIndex(previousSlideIndex);
        }}
      >
        <FaArrowLeft />
      </button>
      <button
        className="bg-white text-black absolute right-12 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed"
        onClick={() => {
          // Calculate the next slide index
          const nextSlideIndex = (slideIndex + 1) % emptyArray.length;
          // Set the next slide index
          setslideIndex(nextSlideIndex);
        }}
      >
        <FaArrowRight />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-[2000]">
        {emptyArray.map((element, index) => (
          <div
            key={index}
            className={`cursor-pointer h-3 w-3 bg-white rounded-full ${
              element === slideIndex ? "opacity-200" : "opacity-80"
            }`}
            onClick={() => setslideIndex(element)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
