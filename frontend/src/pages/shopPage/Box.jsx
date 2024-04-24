import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function Box({ setPriceSorted }) {
  const optionsArray = [
    { label: "Low to High", value: "Lth" },
    { label: "High to Low", value: "Htl" }
  ];

  const [openselect, setOpenSelect] = useState(false);
  const leagueInput = useRef();

  function selectvalue(e, value) {
    leagueInput.current.value = e.target.outerText;
    setOpenSelect(false);
    setPriceSorted(value);
  }

  function openOption() {
    setOpenSelect(!openselect);
  }

  return (
    <div className="flex flex-wrap justify-between">
      <div className="relative w-[150px] h-[40px] flex z-10">
        <input
          className="relative w-full p-[20px] outline-none border-none rounded-[10px] text-white text-lg bg-gray-900 cursor-pointer"
          onClick={openOption}
          onBlur={() => {
            setOpenSelect(false);
          }}
          ref={leagueInput}
          id="league"
          type="text"
          placeholder="Price Order"
          readOnly
        />

        <span className={openselect ? "absolute right-[8px] top-1/2 text-lg text-gray-300 flex items-center pt-[5px] transition-transform duration-200 pointer-events-none transform -translate-y-1/2 rotate-0" : "absolute right-[8px] top-1/2 transform -translate-y-1/2 -rotate-90 text-lg text-gray-300 flex items-center pt-[5px] transition-transform duration-200 pointer-events-none"}>
          <FontAwesomeIcon icon={faAngleDown} />
        </span>

        <div className={openselect ? "absolute w-full max-h-[220px] bg-gray-900 rounded-[10px] top-full overflow-hidden overflow-y-auto transition duration-300 ease-in-out text-gray-300 visible opacity-100 transform translate-y-[5%]" : "absolute w-full max-h-[220px] bg-gray-900 rounded-[10px] top-full transform translate-y-0 overflow-hidden overflow-y-auto invisible opacity-0 transition duration-300 ease-in-out text-gray-300"}>
          {optionsArray.map((item, index) => (
            <li key={index} onClick={(e) => selectvalue(e, item.value)}>
              {item.label}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Box;
