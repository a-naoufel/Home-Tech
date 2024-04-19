import Hero from "../../Components/Hero/Hero";
import Header from "../../Components/header/Header";
import NewArrivals from "../../Components/arrivals/NewArrivals";
import Daily from "../../Components/daily/Daily";
import Phones from "../../Components/phones/Phones";
import { useState } from "react";
import Footer from "../../Components/footer/Footer"


export default function Home() {
  const [notification, setnotification] = useState(0);
  
  return (
    <>
      {/* disabled */}
      <Header notification={notification} setnotification={setnotification}/>
      
      <Hero notification={notification} setnotification={setnotification} />
      <div className="bg-bgColorWhite ">
        <NewArrivals
          notification={notification}
          setnotification={setnotification}
        />
        <Daily />
        <Phones />
       
      </div>
    </>
  );
}
