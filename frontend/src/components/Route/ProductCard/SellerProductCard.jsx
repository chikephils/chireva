import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import SellerProductCardDetails from "../ProductCardDetails/SellerProductCardDetails";
import Ratings from "../../ProductDetails/Ratings";
import { numbersWithCommas } from "../../../utils/priceDisplay";
import styles from "../../../styles/styles";

const SellerProductCard = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const editedPrice = numbersWithCommas(product?.originalPrice);
  const editedDiscountPrice = numbersWithCommas(product?.discountPrice);

  useEffect(() => {}, [product]);

  return (
    <div className="320px:w-[145px] 375px:w-[165px] 400px:w-[175px] min-h-[150px] 800px:min-w-full 800px:min-h-[280px] bg-gradient-to-l from-yellow-200 to-slate-300 ... rounded-lg shadow-lg p-2 800px:p-2 overflow-hidden flex flex-col">
      <div className="flex items-start justify-between">
        <img
          src={`${product.images && product.images[0]?.url}`}
          alt="img"
          className="w-full max-w-[70px] md:min-w-[100px] 800px:min-w-[150px] h-[70px] md:min-h-[100px] 800px:min-h-[150px] object-contain"
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
        <h5 className="text-lime-600 text-[12px] 800px:text-base font-semibold mt-1 hover:text-lime-500">
          {product.shop.shopName}
        </h5>

        <h4 className=" pb-1 800px:pr-0 800px:pb-2 text-[14px] 800px:text-sm font-medium hover:font-bold">
          {product.name.length > 35
            ? product.name.slice(0, 35) + "..."
            : product.name}
        </h4>

        <div className="flex">
          <Ratings rating={product?.ratings} />
        </div>
        <div className="800px:mt-1 flex justify-between">
          <div className="flex-col">
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
          <span className="text-[12px] md:text-x[14px] 880px:text-[16px] font-semibold text-lime-600">
            {product.sold_out} sold
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerProductCard;
