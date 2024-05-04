import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SellerEventDetails = ({ setIsOpen, event }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + event?.images?.length) % event?.images?.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % event?.images?.length);
  };
  return (
    <div className="bg-[#ffffffc6] shadow-xl">
      {event ? (
        <div className="fixed w-full h-screen top-0 800px:top-0 left-0 bg-[#00000050] z-50 flex items-center justify-center shadow-xl">
          <div className="w-[90%] 800px:w-[60%] h-[70vh]  overflow-y-scroll scrollbar-none  bg-white rounded-md shadow-2xl relative p-2 pb-4 ">
            <div className=" sticky top-0 right-0 z-50 cursor-pointer">
              <RxCross1
                size={24}
                className=" absolute right-0 cursor-pointer bg-red-500"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="block w-full 800px:flex">
              <div className="w-full justify-center 800px:w-[40%] ">
                <div className="relative cursor-pointer px-[10px] rounded-[10px] flex items-center justify-center hover:shadow-md mb-2">
                  <div className="min-w-[250px] overflow-hidden rounded-[10px] mb-[10px]">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                      }}
                    >
                      {event.images?.map((photo, index) => (
                        <div
                          key={index}
                          className="relative flex flex-shrink-0 w-full items-center justify-center py-2"
                        >
                          <img
                            src={`${photo?.url}`}
                            alt={`pics ${index + 1}`}
                            className="max-w-[150px]  800px:max-w-[90%] min-h-[200px] 800px:h-[50%] object-contain"
                          />
                          <div
                            className="absolute top-1/2 transform -translate-y-1/2 px-1 rounded-full border-none cursor-pointer flex items-center justify-center z-50 left-[5px] bg-slate-100 "
                            onClick={(e) => {
                              e.stopPropagation();
                              goToPrevSlide(e);
                            }}
                          >
                            <FaArrowLeft size={30} />
                          </div>
                          <div
                            className="absolute top-1/2 transform -translate-y-1/2 px-1 rounded-full border-none cursor-pointer flex items-center justify-center z-50 right-[5px] bg-slate-100 "
                            onClick={(e) => {
                              e.stopPropagation();
                              goToNextSlide(e);
                            }}
                          >
                            <FaArrowRight size={30} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <img
                    src={`${event.shop.avatar?.url}`}
                    alt="img"
                    className="w-[45px] 800px:w-[50px] h-[45px] 800px:h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {event.shop.shopName}
                    </h3>
                    <h5 className="pb-3 text-[13px] 800px:text-[15px]">
                      ({event.shop?.ratings}) Ratings
                    </h5>
                  </div>
                </div>

                <h5 className="text-[14px] text-red-600 pb-4">
                  ({event.sold_out}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[60%] pt-5 pl-[5px] pr-1">
                <h1
                  className={`${styles.productTitle} text-base 800px:text-[18px] pb-1 pr-5`}
                >
                  {event.name}
                </h1>
                <p className="block text-[14px] 800px:text-[18px] pr-2">
                  {event.description}
                </p>
                <div className=" flex pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} text-[12px] 800px:text-base`}
                  >
                    &#x20A6; {event.discountPrice}
                  </h4>
                  <h3 className={`${styles.price} text-sm 800px:text-base`}>
                    &#x20A6;{event.originalPrice ? event.originalPrice : null}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SellerEventDetails;
