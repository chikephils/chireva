import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import ProductCardDetails from "../ProductCardDetails/ProductCardDetails";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import Ratings from "../../ProductDetails/Ratings";
import {
  addToCart,
  removeFromCart,
  itemsInCart,
} from "../../../features/cart/cartSlice";
import {
  addToWishList,
  removeFromWishList,
  selectWishListItems,
} from "../../../features/wishlist/wishlistSlice";

const ProductCard = ({ product, isEvent }) => {
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wishlist = useSelector(selectWishListItems);
  const [inCart, setInCart] = useState(false);
  const cart = useSelector(itemsInCart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((listItem) => listItem._id === product._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, product._id]);

  useEffect(() => {
    if (cart && cart.find((item) => item._id === product._id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [product._id, cart]);

  const removeFromWishListHandler = () => {
    setClick(!click);
    dispatch(removeFromWishList({ item: product }));
  };

  const addToWishListHandler = () => {
    setClick(!click);
    dispatch(addToWishList({ item: product }));
  };

  const add = () => {
    setInCart(!inCart);
    dispatch(addToCart({ item: product }));
  };

  const remove = () => {
    setInCart(!inCart);
    dispatch(removeFromCart({ item: product }));
  };

  return (
    <div className="320px:w-[145px] 375px:w-[165px] 400px:w-[175px] min-h-[150px] lg:min-w-full lg:min-h-[280px] bg-gradient-to-r from-slate-50 to-slate-200 ... rounded-lg shadow-lg p-2 lg:p-2 overflow-hidden flex flex-col">
      <div className="flex items-start justify-between">
        <Link
          to={`${
            isEvent === true
              ? `/product/${product?._id}?isEvent=true`
              : `/product/${product?._id}`
          }`}
        >
          <img
            src={`${product.images && product.images[0]?.url}`}
            alt="img"
            className="w-full max-w-[70px] md:min-w-[100px] lg:min-w-[150px] h-[70px] md:min-h-[100px] lg:min-h-[150px] object-contain"
          />
        </Link>
        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className=" cursor-pointer relative mt-1"
              onClick={removeFromWishListHandler}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer relative mt-1"
              onClick={addToWishListHandler}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer relative mt-1"
            onClick={() => setIsOpen(!isOpen)}
            color="#333"
            title="Quick view"
          />
          {inCart ? (
            <MdShoppingCart
              size={22}
              className="cursor-pointer relative mt-1"
              onClick={remove}
              color={inCart ? "red" : "#333"}
              title="Remove from cart"
            />
          ) : (
            <MdOutlineShoppingCart
              size={22}
              className="cursor-pointer relative mt-1"
              onClick={add}
              color={inCart ? "red" : "#333"}
              title="Add to cart"
            />
          )}

          {isOpen ? (
            <ProductCardDetails
              setIsOpen={setIsOpen}
              product={product}
              addToCart={add}
              remove={remove}
              inCart={inCart}
              setInCart={setInCart}
            />
          ) : null}
        </div>
      </div>

      <div>
        <Link to={`/shop/preview/${product?.shop?._id}`}>
          <h5 className="text-lime-600 text-[12px] lg:text-base font-semibold mt-1 hover:text-lime-500">
            {product?.shop?.shopName}
          </h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${product._id}?isEvent=true`
              : `/product/${product._id}`
          }`}
        >
          <h4 className=" pb-1 lg:pr-0 lg:pb-2 text-[14px] lg:text-sm font-medium hover:font-bold">
            {product?.name.length > 35
              ? product?.name.slice(0, 35) + "..."
              : product?.name}
          </h4>
        </Link>
        <div className="flex">
          <Ratings rating={product?.ratings} />
        </div>
        <div className="lg:mt-1 flex justify-between">
          <div className="flex">
            {product.originalPrice === 0 ? null : (
              <p className="text-[14px] md:text-[14px] lg:text-base font-medium mt-1">
                &#x20A6; {product?.discountPrice}
              </p>
            )}
            {product.originalPrice && (
              <p className="text-[12px] md:text-[14px] lg:text-base font-medium text-red-600 line-through pl-3 mt-3">
                &#x20A6; {product?.originalPrice}
              </p>
            )}
          </div>

          <span className="text-[12px] md:text-x[14px] lg:text-[16px] font-semibold text-lime-600">
            {product?.sold_out} sold
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
