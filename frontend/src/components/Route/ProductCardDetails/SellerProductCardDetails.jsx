import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const SellerProductCardDetails = ({ setIsOpen, product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + product?.images?.length) % product?.images?.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product?.images?.length);
  };

  useEffect(() => {}, [product]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0000004b] z-50 flex items-center justify-center">
      <div className=" w-[90%] lg:w-[60%] h-[70vh] md:h-[70vh] overflow-y-scroll scrollbar-none lg:h-[75vh] bg-gradient-to-l from-slate-50 to-slate-200 ... rounded-md shadow-2xl  p-2 mt-[70px] lg:mt-[82px] z-[1000] ">
        <div className=" sticky top-0 right-0 z-50 cursor-pointer">
          <RxCross1
            size={24}
            className=" absolute right-0 cursor-pointer bg-red-500"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="block w-full lg:flex">
          <div className="w-full justify-center lg:w-[40%] ">
            <div className="relative cursor-pointer px-[10px] rounded-[10px] flex items-center justify-center hover:shadow-md">
              <div className="min-w-[250px] overflow-hidden rounded-[10px] mb-[10px]">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {product.images?.map((photo, index) => (
                    <div
                      key={index}
                      className="relative flex flex-shrink-0 w-full items-center justify-center"
                    >
                      <img
                        src={`${photo?.url}`}
                        alt={`pics ${index + 1}`}
                        className="max-w-[150px]  lg:max-w-[100%] min-h-[150px] lg:h-[50%] object-contain "
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

            <div className="flex py-4">
              <img
                src={`${product.shop?.avatar?.url}`}
                alt="img"
                className="w-[45px] lg:w-[50px] h-[45px] lg:h-[50px] rounded-full mr-2"
              />
              <div>
                <h3 className={`${styles.shop_name}`}>
                  {product.shop.shopName}
                </h3>
                <h5 className="pb-3 text-[13px] lg:text-[15px]">
                  ({product.shop?.ratings}) Ratings
                </h5>
              </div>
            </div>

            <h5 className="text-[14px] text-red-600 pb-4">
              ({product?.sold_out}) Sold out
            </h5>
          </div>
          <div className="w-full lg:w-[60%] pt-5 pl-[5px] pr-1">
            <h1
              className={`${styles.productTitle} text-base lg:text-[18px] pb-1 pr-5`}
            >
              {product.name}
            </h1>
            <p className="block text-[14px] lg:text-[18px] pr-2">
              {product?.description}
            </p>
            <div className=" flex pt-3">
              <h4
                className={`${styles.productDiscountPrice} text-sm lg:text-base`}
              >
                &#x20A6; {product?.discountPrice}
              </h4>
              <h3 className={`${styles.price} text-sm lg:text-base`}>
                &#x20A6;{" "}
                {product?.originalPrice ? product?.originalPrice : null}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCardDetails;
