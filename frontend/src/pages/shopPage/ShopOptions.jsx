export const ShopOptions = ({
 
 
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="options">
           <select className="mr-[15px] mb-[10px] p-[10px] rounded-[6px] bg-bgColorBlack text-white" >
            <option disabled>Select Category</option>
            <option value="All">All</option>
            <option value="electronics">Electronics</option>
            <option value="Tv">Tv</option>
            <option value="phone">phone</option>
            <option value="laptop">laptop</option>
          </select>
          <select className="mr-[15px] mb-[10px] p-[10px] rounded-[6px] bg-bgColorBlack text-white">
            <option disabled>Select Price</option>
            <option value="All">All</option>
            <option value="Lth">Low to High</option>
            <option value="Htl">High to Low</option>
          </select>
         
        </div>
      </div>
    </>
  );
};
