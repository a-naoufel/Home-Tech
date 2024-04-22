export const ProductListUL = ({ toggled, setToggled, setApiControl }) => {
  return (
    <>
      <ul className="flex justify-evenly w-[90%] my-0 mx-auto bg-[#201F20] mb-[20px] rounded-[6px] text-white  ">
        <li
          className={toggled === "All" ? "active" : ""}
          onClick={() => (setApiControl(""), setToggled("All"))}
        >
          All
        </li>
        <li
          className={toggled === "Electronics" ? "active" : ""}
          onClick={() => (
            setApiControl("/category/electronics"), setToggled("Electronics")
          )}
        >
          Electronics
        </li>
        <li
          className={toggled === "Jewelry" ? "active" : ""}
          onClick={() => (
            setApiControl("/category/jewelery"), setToggled("Jewelry")
          )}
        >
          Air Conditioner
        </li>
        <li
          className={toggled === "Men's clothing" ? "active" : ""}
          onClick={() => (
            setApiControl("/category/men's clothing"),
            setToggled("Men's clothing")
          )}
        >
          TV
        </li>
        <li
          className={toggled === "Women's clothing" ? "active" : ""}
          onClick={() => (
            setApiControl("/category/women's clothing"),
            setToggled("Women's clothing")
          )}
        >
          Kitchen
        </li>
      </ul>
    </>
  );
};
