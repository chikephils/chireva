import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";

const PaymentMethods = () => {
  return (
    <div className="">
      <div className="sticky top-2 mb-2 flex items-center justify-between">
        <h1 className=" text-sm font-medium lg:text-[25px] lg:font-[600] text-black ">
          Payment Methods
        </h1>

        <div>
          <div className={`${styles.sm_button} rounded-md`}>
            <span className="text-white text-sm lg:text-base"> Add New</span>
          </div>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between ">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt="img"
          />
          <h5 className="hidden lg:flex pl-5 font-[600]">Chike Oreva</h5>
        </div>
        <div className=" lg:hidden flex flex-col pl-2">
          <h4 className=" text-sm font-medium">Chike Oreva</h4>
          <p className="text-xs mt-1"> 1245*******8071</p>
        </div>
        <div className="pl-8 hidden lg:flex items-center">
          <h6> 1245********8071</h6>
          <h5 className="flex pl-12"> 08/22</h5>
        </div>
        <div className="lg:min-w-[10%] flex items-center justify-between pl-2">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
