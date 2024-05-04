import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { numbersWithCommas } from "../../../utils/priceDisplay";
import { useSelector } from "react-redux";
import { selectAllShopProducts } from "../../../features/shop/shopSlice";

const SellerProductCardDetails = ({ setIsOpen, product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const editedPrice = numbersWithCommas(product?.originalPrice);
  const editedDiscountPrice = numbersWithCommas(product?.discountPrice);
  const shopProducts = useSelector(selectAllShopProducts);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + product?.images?.length) % product?.images?.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product?.images?.length);
  };

  const totalReviewsLength =
    shopProducts &&
    shopProducts.reduce((acc, product) => acc + product.reviews?.length, 0);

  const totalRatings =
    shopProducts &&
    shopProducts.reduce(
      (acc, product) =>
        acc + product.reviews?.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  return (
    <div className="fixed w-full h-full top-0 left-0 bg-[#00000061] z-[1000] flex items-center justify-center shadow-xl">
      <div className="w-[90%] 800px:w-[60%] h-[80vh] md:h-[90vh] overflow-y-scroll scrollbar-none 800px:h-[75vh] bg-gradient-to-l from-slate-100 to-slate-200 ... rounded-md shadow-2xl relative p-2 pt-2 pb-6 mb-3 ">
        <div className=" sticky top-0 right-0 z-50 cursor-pointer">
          <RxCross1
            size={24}
            className=" absolute right-0 cursor-pointer bg-red-500"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="block w-full 800px:flex">
          <div className="w-full justify-center 800px:w-[40%] ">
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
                        className="max-w-[150px]  800px:max-w-[100%] min-h-[150px] 800px:h-[50%] object-contain "
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
                className="w-[45px] 800px:w-[50px] h-[45px] 800px:h-[50px] rounded-full mr-2"
              />
              <div>
                <h3 className={`${styles.shop_name}`}>
                  {product.shop.shopName}
                </h3>
                <h5 className="pb-3 text-[13px] 800px:text-[15px]">
                  {averageRating} Ratings
                </h5>
              </div>
            </div>

            <h5 className="text-[14px] text-red-600 pb-4">
              ({product?.sold_out}) Sold out
            </h5>
          </div>
          <div className="w-full 800px:w-[60%] pt-5 pl-[5px] pr-1">
            <h1
              className={`${styles.productTitle} text-base 800px:text-[18px] pb-1 pr-5`}
            >
              {product.name}
            </h1>
            <p className="block text-[14px] 800px:text-[18px] pr-2">
              {product?.description}
            </p>
            <div className=" flex-col pt-3">
              <h4
                className={`${styles.productDiscountPrice} text-sm 800px:text-base`}
              >
                &#x20A6; {editedDiscountPrice}
              </h4>
              {product.originalPrice !== null && (
                <h3 className={`${styles.price}  !pt-2`}>
                  &#x20A6; {editedPrice}
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCardDetails;
