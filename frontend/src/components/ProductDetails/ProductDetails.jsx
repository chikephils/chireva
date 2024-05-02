import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { server } from "../../server";
import {
  addToCart,
  itemsInCart,
  increaseItemQuantity,
  reduceItemQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import {
  addToWishList,
  removeFromWishList,
  selectWishListItems,
} from "../../features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "./Ratings";
import axios from "axios";
import { toast } from "react-toastify";
import { selectAllProducts } from "../../features/product/productSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductDetails = ({ product }) => {
  const [click, setClick] = useState(false);
  const cartItems = useSelector(itemsInCart);
  const wishlist = useSelector(selectWishListItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const user = useSelector((state) => state.user.user);
  const [inCart, setInCart] = useState(false);
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

  const shopProducts =
    products &&
    products.filter((prdt) => prdt?.shop?._id === product?.shop?._id);

  useEffect(() => {
    if (wishlist && wishlist.find((listItem) => listItem._id === product._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, product?._id]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (
      cartItems.length > 0 &&
      cartItems.find((item) => item._id === product._id)
    ) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [product?._id]);

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

  const incrementCount = () => {
    dispatch(increaseItemQuantity({ item: product }));
  };

  const decrementCount = () => {
    dispatch(reduceItemQuantity({ item: product }));
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

  const handleMessageSubmit = async () => {
    if (user) {
      const groupTitle = product.shop._id + user._id;
      const userId = user._id;
      const sellerId = product.shop._id;

      try {
        const response = await axios.post(
          `${server}/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        );

        const conversationId = response.data.conversation._id;

        // Pass the state object to the navigate function
        navigate(`/profile/inbox/${conversationId}`, {
          state: {
            conversation: response.data.conversation,
            seller: product.shop,
            online: true,
          },
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please login to create a conversation");
    }
  };
  const { name, description, originalPrice, discountPrice, shop } = product;

  return (
    <div className="bg-gradient-to-r from-slate-100 to-slate-200 ...">
      <div className={`${styles.section} w-[90%] lg:w-[90%] pb-10`}>
        <div className="w-full py-5">
          <div className="block w-full lg:flex">
            <div className="w-full lg:w-[50%] px-2 ">
              <div className="relative cursor-pointer px-[10px] rounded-[10px] flex items-center justify-center hover:shadow-md">
                <div className="min-w-[250px] overflow-hidden rounded-[10px] mb-[10px]">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {product.images?.map((photo, index) => (
                      <div
                        key={index}
                        className="relative flex flex-shrink-0 w-full items-center justify-center"
                      >
                        <img
                          src={`${photo?.url}`}
                          alt={`pics ${index + 1}`}
                          className="max-h-[250px] max-w-[200px] 600px:max-h-[300px] lg:max-h-[350px] lg:max-w-[400px] mb-2 flex items-center justify-center"
                        />
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 rounded-full px-1 border-none cursor-pointer flex items-center justify-center z-50 left-[5px] bg-slate-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            goToPrevSlide(e);
                          }}
                        >
                          <FaArrowLeft size={30} />
                        </div>
                        <div
                          className="absolute top-1/2 transform -translate-y-1/2 rounded-full px-1 border-none cursor-pointer flex items-center justify-center z-50 right-[5px] bg-slate-200 "
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
            </div>
            <div className="w-full lg:w-[50%] pt-5">
              <h1 className={`${styles.productTitle} text-base pb-3`}>
                {name}
              </h1>
              <p className="text-sm lg:text-base">{description}</p>
              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  &#x20A6; {discountPrice}
                </h4>
                <h3 className={`${styles.price}`}>
                  &#x20A6; {originalPrice ? originalPrice : null}
                </h3>
              </div>
              <div className="flex items-center mt-4 justify-between pr-3">
                <div className="flex">
                  <button
                    className="bg-gradient-to-r from-lime-500 to-lime-600 text-[22px] text-black font-bold rounded-sm flex items-center justify-center shadow-lg border w-10"
                    onClick={decrementCount}
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
                    onClick={incrementCount}
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
              <div className="mt-3">
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
                    onClick={add}
                  >
                    <span className="text-sm   text-white flex text-center">
                      Add to Cart{" "}
                      <AiOutlineShoppingCart size={20} className="ml-1" />
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <img
                  src={`${shop.avatar?.url}`}
                  alt="img"
                  className="w-[50px] h-[50px] rounded-full mr-2 border-[1.5px] border-gray-500"
                />
                <div className="pr-3">
                  <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                    {shop.shopName}
                  </h3>
                  <h5 className="pb-3 text-[15px]">
                    {(averageRating / 5).toFixed(2)} Ratings
                  </h5>
                </div>
                <div
                  className={`${styles.button} bg-blue-700 mt-3 !w-max !h-[45px] lg:px-2 shadow-xl !rounded-full lg:mr-3 p-1`}
                  onClick={() => handleMessageSubmit()}
                >
                  <span className="text-sm text-white font-semibold flex items-center">
                    Send Message
                    <AiOutlineMessage size={20} className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailsInfo
          product={product}
          totalRatings={totalRatings}
          totalReviewsLength={totalReviewsLength}
          shopProducts={shopProducts}
          averageRating={averageRating}
        />
      </div>
    </div>
  );
};

const ProductDetailsInfo = ({
  product,
  totalReviewsLength,
  shopProducts,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  const { description, shop } = product;

  return (
    <div className="bg-gradient-to-r from-gray-300 to-blue-300 ... px-3 lg:px-10 py-2 rounded shadow-lg ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-black text-[15px] leaading-5 font-[600] cursor-pointer lg:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-black text-[15px] leaading-5 font-[600] cursor-pointer lg:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-black text-[15px] leaading-5 font-[600] cursor-pointer lg:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[14px] lg:text-[16px] leeading-8 pb-20 whitespace-pre-line">
            {description}
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll scrollbar-none">
          {product &&
            product.reviews.map((review, index) => (
              <div className="w-full flex my-2" key={index}>
                <div className="relative" style={{ flexShrink: 0 }}>
                  <img
                    src={`${review?.user?.avatar?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">
                      {review?.user?.firstName}
                    </h1>
                    <Ratings rating={product?.ratings} />
                  </div>
                  <p>{review?.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {product && product.reviews.length === 0 && (
              <h5>No Reviews for this product!</h5>
            )}
          </div>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block lg:flex p-2 lg:p-5">
          <div className="w-full lg:w-[50%]">
            <div className="flex items-center">
              <img
                src={`${shop?.avatar?.url}`}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{product?.shop_name}</h3>
                <h5 className="pb-2 text-[16px] lg:text-[20px] font-semibold">
                  {(averageRating / 5).toFixed(2)} Ratings
                </h5>
              </div>
            </div>
            <p className="text-[14px] lg:text-[18px]">{shop?.description}</p>
          </div>
          <div className="w-full lg:w-[50%] mt-5 lg:mt-0 lg:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600] text-[15px] lg:text-[18px]">
                Joined:{" "}
                <span className="font-[500] text-[14px] lg:text-[16px]">
                  {shop.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] text-[15px] lg:text-[18px] pt-3">
                Total Products:{" "}
                <span className="font-[500] text-[14px] lg:text-[16px]">
                  {shopProducts && shopProducts.length}
                </span>
              </h5>
              <h5 className="font-[600] text-[15px] lg:text-[18px] pt-3">
                Total Reviews:{" "}
                <span className="font-[500] text-[14px] lg:text-[16px]">
                  {totalReviewsLength}
                </span>
              </h5>
              <Link to={`/shop/preview/${product?.shop?._id}`}>
                <div
                  className={`${styles.button} !w-max !h-[45px]  px-2 shadow-xl !rounded-xl  mt-3`}
                >
                  <h4 className="text-[14px] lg:text-[18px] font-semibold text-white">
                    {" "}
                    Visit Shop
                  </h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
