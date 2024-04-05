import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import SellerProductCardDetails from "../ProductCardDetails/SellerProductCardDetails";
import Ratings from "../../ProductDetails/Ratings";

const SellerProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, [product]);

  return (
    <div className="320px:w-[145px] 375px:w-[165px] 400px:w-[175px] min-h-[150px] lg:min-w-full lg:min-h-[280px] bg-gradient-to-l from-yellow-200 to-slate-300 ... rounded-lg shadow-2xl p-2 lg:p-2 overflow-hidden flex flex-col">
      <div className="flex items-start justify-between">
        <img
          src={`${product.images && product.images[0]?.url}`}
          alt="img"
          className="w-full max-w-[70px] md:min-w-[100px] lg:min-w-[150px] h-[70px] md:min-h-[100px] lg:min-h-[150px] object-contain"
        />

        {/* side options */}

        <div>
          <AiOutlineEye
            size={22}
            className="cursor-pointer relative mt-1"
            onClick={() => setIsOpen(!isOpen)}
            color="#333"
            title="Quick view"
          />

          {isOpen ? (
            <SellerProductCardDetails setIsOpen={setIsOpen} product={product} />
          ) : null}
        </div>
      </div>

      <div>
        <h5 className="text-lime-600 text-[12px] lg:text-base font-semibold mt-1 hover:text-lime-500">
          {product.shop.shopName}
        </h5>

        <h4 className=" pb-1 lg:pr-0 lg:pb-2 text-[14px] lg:text-sm font-medium hover:font-bold">
          {product.name.length > 35
            ? product.name.slice(0, 35) + "..."
            : product.name}
        </h4>

        <div className="flex">
          <Ratings rating={product?.ratings} />
        </div>
        <div className="lg:mt-1 flex justify-between">
          <div className="flex">
            <p className=" text-[14px] md:text-[14px] lg:text-base font-medium mt-1">
              &#x20A6;{" "}
              {product.originalPrice === 0
                ? product.originalPrice
                : product.discountPrice}
            </p>
            <p className=" text-[12px] md:text-[14px] lg:text-base font-medium text-red-600 line-through pl-3 mt-3 ">
              &#x20A6; {product?.originalPrice ? product.originalPrice : null}
            </p>
          </div>
          <span className="text-[12px] md:text-x[14px] lg:text-[16px] font-semibold text-lime-600">
            {product.sold_out} sold
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;
