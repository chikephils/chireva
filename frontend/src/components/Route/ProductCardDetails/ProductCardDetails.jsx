import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  increaseItemQuantity,
  reduceItemQuantity,
  itemsInCart,
} from "../../../features/cart/cartSlice";
import {
  selectWishListItems,
  addToWishList,
  removeFromWishList,
} from "../../../features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../../../features/product/productSlice";
import { numbersWithCommas } from "../../../utils/priceDisplay";

const ProductCardDetails = ({
  setIsOpen,
  product,
  addToCart,
  remove,
  inCart,
  setInCart,
}) => {
  const [click, setClick] = useState(false);
  const cartItems = useSelector(itemsInCart);
  const wishlist = useSelector(selectWishListItems);
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const editedPrice = numbersWithCommas(product?.originalPrice);
  const editedDiscountPrice = numbersWithCommas(product?.discountPrice);

  const shopProducts = products.filter(
    (prdt) => prdt.shop._id === product.shop._id
  );

  useEffect(() => {
    if (wishlist && wishlist.find((listItem) => listItem._id === product._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, product._id]);

  useEffect(() => {
    if (cartItems && cartItems.find((item) => item._id === product._id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [product._id, setInCart, cartItems]);

  const removeFromWishListHandler = () => {
    setClick(!click);
    dispatch(removeFromWishList({ item: product }));
  };

  const addToWishListHandler = () => {
    setClick(!click);
    dispatch(addToWishList({ item: product }));
  };

  const handleMessageSumbit = () => {
    console.log("message sumbit");
  };

  const decreamentCount = () => {
    dispatch(reduceItemQuantity({ item: product }));
  };

  const increamentCount = () => {
    dispatch(increaseItemQuantity({ item: product }));
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
    <div className="bg-[#fff] shadow-xl">
      {product ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
          <div className="w-[90%] 800px:w-[60%] h-[80vh] md:h-[90vh] overflow-y-scroll scrollbar-none 800px:h-[75vh] bg-white rounded-md shadow-2xl relative p-2 pt-2 pb-6 mb-3 ">
            <div className=" sticky top-0 right-0 z-50 cursor-pointer">
              <RxCross1
                size={24}
                className=" absolute right-0 cursor-pointer bg-red-500"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="block w-full 800px:flex">
              <div className="w-full justify-center 800px:w-[40%] ">
                <div className="flex justify-center py-2">
                  <img
                    src={`${product.images && product.images[0]?.url}`}
                    alt="img"
                    className="max-w-[80%]  800px:max-w-[100%] max-h-[150px] 800px:h-[60%] "
                  />
                </div>

                <div className="flex">
                  <img
                    src={`${product.shop?.avatar?.url}`}
                    alt="img"
                    className="w-[45px] 800px:w-[50px] h-[45px] 800px:h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {product.shop?.shopName}
                    </h3>
                    <h5 className="pb-3 text-[13px] 800px:text-[15px]">
                      {(averageRating / 5).toFixed(2)} Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} !w-max !h-[40px] px-2 shadow-xl !rounded-xl `}
                  onClick={handleMessageSumbit}
                >
                  <span className=" text-sm text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[14px] text-red-600 pb-4">
                  ({product?.sold_out}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[60%] pt-5 pl-[5px] pr-1">
                <h1
                  className={`${styles.productTitle} text-base 800px:text-[18px] pb-1 pr-5`}
                >
                  {product?.name}
                </h1>
                <p className="block text-[14px] 800px:text-[18px] pr-2">
                  {product?.description}
                </p>
                <div className="flex-col pt-3">
                  <h4
                    className={`${styles.productDiscountPrice} text-sm 800px:text-base`}
                  >
                    &#x20A6; {editedDiscountPrice}
                  </h4>
                  {product.originalPrice !== null && (
                    <h3 className={`${styles.price} !pt-2`}>
                      &#x20A6; {editedPrice}
                    </h3>
                  )}
                </div>
                <div className="flex items-center mt-4 justify-between pr-3">
                  <div className="flex">
                    <button
                      className="bg-gradient-to-r from-lime-500 to-lime-600 text-[22px] text-black font-bold rounded-sm flex items-center justify-center shadow-lg border w-10"
                      onClick={decreamentCount}
                    >
                      -
                    </button>
                    {cartItems.some((item) => item._id === product._id) ? (
                      <span
                        key={product._id}
                        className="bg-gradient-to-r from-slate-50 to-slate-100 text-black font-bold rounded-sm flex items-center justify-center shadow-lg w-10 "
                      >
                        {cartItems.find((item) => item._id === product._id)
                          ?.quantity || 0}
                      </span>
                    ) : (
                      <span
                        key={product._id}
                        className="bg-gradient-to-r from-slate-50 to-slate-100 text-black font-bold rounded-sm flex items-center justify-center shadow-lg w-10 "
                      >
                        0
                      </span>
                    )}

                    <button
                      className="bg-gradient-to-r  from-lime-500 to-lime-600  text-[22px] text-black font-bold rounded-sm flex items-center justify-center shadow-lg w-10"
                      onClick={increamentCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className=" cursor-pointer "
                        onClick={removeFromWishListHandler}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={addToWishListHandler}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div className="my-3">
                  {inCart ? (
                    <div
                      className={`!w-max !h-[45px] px-2 shadow-xl !rounded-xl mr-3 bg-red-500 flex items-center cursor-pointer`}
                      onClick={remove}
                    >
                      <span className="text-sm  text-white flex text-center">
                        Remove from Cart{" "}
                        <AiOutlineShoppingCart size={20} className="ml-1" />
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`!w-max !h-[45px] px-2 shadow-xl !rounded-xl mr-3 bg-black flex items-center cursor-pointer`}
                      onClick={addToCart}
                    >
                      <span className="text-sm   text-white flex text-center">
                        Add to Cart{" "}
                        <AiOutlineShoppingCart size={20} className="ml-1" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCardDetails;
