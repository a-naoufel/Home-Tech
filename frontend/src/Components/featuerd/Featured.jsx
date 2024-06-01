import { LiaShippingFastSolid } from "react-icons/lia";
import { BsHeadset, BsShieldCheck, BsBoxSeam } from "react-icons/bs";

export const Featured = () => {
  return (
    <>
      <div className="featured">
        <div className="">
          <ul className="relative flex items-center justify-between bg-white shadow-sm rounded-6 p-[15px] w-[95%] mx-auto top-[10px] sm:">
            <li className="flex items-center">
              <LiaShippingFastSolid className="text-[25px] text-mainColor"/>
              <div className="txt">
                <p>Free Shipping</p>
                <span className="text-bgColorBlack text-xs">Free shipping on all your order</span>
              </div>
            </li>
            <li className="flex items-center">
              <BsHeadset className="text-[25px] text-mainColor"/>
              <div className="txt">
                <p>Customer Support 24/7</p>
                <span className="text-bgColorBlack text-xs">Instant access to Support</span>
              </div>
            </li>
            <li className="flex items-center">
              <BsShieldCheck className="text-[25px] text-mainColor"/>
              <div className="ml-3">
                <p>100% Secure Payment</p>
                <span className="text-bgColorBlack text-xs">We ensure your money is save</span>
              </div>
            </li>
            <li className="flex items-center">
              <BsBoxSeam className="text-[25px] text-mainColor"/>
              <div className="ml-3">
                <p>Money-Back Guarantee</p>
                <span className="text-bgColorBlack text-xs">30 Days Money-Back Guarantee</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
