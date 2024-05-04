import React from "react";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import Checkout from "../../components/Checkout/Checkout";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const CheckoutPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-400 min-h-screen">
        <div className=" w-full flex items-center justify-center py-2 fixed top-0  bg-gray-500 z-50">
          <CheckoutSteps active={1} />
          <div className="absolute top-1 right-2 justify-end">
            <RxCross2
              size={30}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
        <div className=" 320px:mt-24 600px:mt-14 800px:mt-14">
          <Checkout />
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
