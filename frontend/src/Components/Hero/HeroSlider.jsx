import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Creating an empty array to store slide indexes
const emptyArray = [];
for (let i = 0; i < 5; i++) {
  emptyArray.push(i);
}

// HeroSlider component
// eslint-disable-next-line react/prop-types
function HeroSlider({ slideIndex, setslideIndex }) {
  return (
    <div className="absolute w-[100vw] h-full">
      {/* Left navigation button */}
      <button
        className="bg-white text-black absolute left-12 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed"
        disabled={slideIndex === 0}
        onClick={() => setslideIndex(slideIndex - 1)}
      >
        <FaArrowLeft />
      </button>
      {/* Right navigation button */}
      <button
        className="bg-white text-black absolute right-12 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 disabled:opacity-30 z-10 disabled:cursor-not-allowed"
        disabled={slideIndex === 3}
        onClick={() => setslideIndex(slideIndex + 1)}
      >
        <FaArrowRight />
      </button>
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 z-[2000]">
        {/* Mapping through emptyArray to render slide indicators */}
        {emptyArray.map((element, index) => (
          <div
            key={index}
            className={`cursor-pointer h-3 w-3 bg-white  rounded-full ${
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
