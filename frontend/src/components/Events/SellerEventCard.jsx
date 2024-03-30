import React, { useState } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { AiOutlineEye } from "react-icons/ai";
import SellerEventDetails from "./SellerEventDetails";


const SellerEventCard = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)


 
  return (
    <div
      className={`w-full block, bg-white rounded-lg lg:h-[300px] lg:flex p-2 mb-6`}
    >
      <div className=" lg:w-[40%] flex justify-center" >
        <img src={`${event.images && event.images[0]?.url}`} alt="img" 
        className="max-h-[100px] lg:max-h-[250px]"
        />
      </div>
      <div className="w-full lg:[w-40%] flex flex-col justify center">
        <h2 className="text-[18px] md:text-[20px] lg:text-[25px] font-semibold pb-2">
          {" "}
          {event?.name}
        </h2>
        <p className=" text-[14px] md:text-[16px] lg:text-[20px] font-Roboto md:pb-2">
          {event.description.slice(0,100)}...
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <p className={`${styles.productDiscountPrice}`}>
            &#x20A6;{event?.discountPrice}
            </p>
            <p className={`${styles.price}`}>
            &#x20A6;{event.originalPrice}
            </p>
          </div>
          <div>
            <span className="pr-3 font-bold text-[15px] lg:text-[17px] text-lime-600">
              {event?.sold_out}
            </span>
          </div>
        </div>
        <CountDown event={event} />
        <div className="flex items-center">
            <button
              className={`${styles.button} !w-max !h-[40px]  px-2 shadow-xl !rounded-xl mr-3`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="text-sm text-white flex items-center">
                See Details <AiOutlineEye size={20} className="ml-1" />
              </span>
            </button>
          
         
          {isOpen ? (
            <SellerEventDetails
            setIsOpen={setIsOpen}
            event={event}
            />
          ) : null}
        </div>

      </div>
    </div>
  );
};

export default SellerEventCard;
