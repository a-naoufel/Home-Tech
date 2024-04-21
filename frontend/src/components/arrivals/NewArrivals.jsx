import Product from "../Product/Product";

// eslint-disable-next-line react/prop-types
export default function NewArrivals({notification, setnotification}) {
  return (
    <div className="container pt-6">
        <div className="flex justify-center  ">
      <p className="border-b-4 px-5 border-mainColor pb-2 text-2xl font-bold  ">
        New arrivals
      </p>
      </div>
        <div className="flex gap-8 flex-wrap my-12 justify-center">
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        <Product notification={notification} setnotification={setnotification} />
        
       
           
        </div>
    </div>
  );
}
