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
          className={toggled === "Tv" ? "active" : ""}
          onClick={() => (
            setApiControl("/category/TV"), setToggled("TV")
          )}
        >
          Air Conditioner
        </li>
        <li
          className={toggled === "TV" ? "active" : ""}
          onClick={() => (
            setApiControl("/category/TV"),
            setToggled("TV")
          )}
        >
          TV
        </li>
        <li
          className={toggled === "TV" ? "active" : ""}
          onClick={() => (
            setApiControl("/category/TV"),
            setToggled("TV")
          )}
        >
          Kitchen
        </li>
      </ul>
    </>
  );
};
