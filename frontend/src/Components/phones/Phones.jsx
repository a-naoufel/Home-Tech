import Product from "../Product/Product";

export default function Phones() {
  return (
    <div className="container py-6">
      <div className="flex justify-center">
        <p className="text-2xl font-bold border-b-4 px-5 border-mainColor">
          Phones
        </p>
      </div>
      <div className="my-12 flex flex-wrap justify-center gap-8  ">
        
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    
  );
}
