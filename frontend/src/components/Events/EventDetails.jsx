import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import {
  increaseItemQuantity,
  itemsInCart,
  reduceItemQuantity,
} from "../../features/cart/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";

const EventDetails = ({ setIsOpen, event, addToCart, remove }) => {
  const cartItems = useSelector(itemsInCart);
  const isAuthenticated = Boolean(useSelector((state) => state.user.token));
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleMessageSumbit = async () => {
    if (isAuthenticated) {
      const groupTitle = event.shop._id + user._id;
      const userId = user._id;
      const sellerId = event.shop._id;

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

        navigate(`/profile/inbox/${conversationId}`, {
          state: {
            conversation: response.data.conversation,
            seller: event.shop,
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

  const decreamentCount = () => {
    dispatch(reduceItemQuantity({ item: event }));
  };

  const increamentCount = () => {
    dispatch(increaseItemQuantity({ item: event }));
  };
  return (
    <div className="bg-[#fff] shadow-xl">
      {event ? (
        <div className="fixed w-full h-screen top-0 800px:top-0 left-0 bg-[#00000050] z-50 flex items-center justify-center shadow-xl">
          <div className="w-[90%] 800px:w-[60%] h-[80vh] md:h-[90vh] overflow-y-scroll scrollbar-none 800px:h-[75vh] bg-white rounded-md shadow-2xl relative p-2 ">
            <div className=" sticky top-0 right-0 z-50 cursor-pointer">
              <RxCross1
                size={24}
                className=" absolute right-0 cursor-pointer bg-red-500"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[40%] ">
                <div className="flex justify-center">
                  <img
                    src={`${event.images && event.images[0].url}`}
                    alt="img"
                    className="max-w-[50%] 800px:max-w-[100%] h-[40%] 800px:h-[60%] object-contain"
                  />
                </div>

                <div className="flex">
                  <img
                    src={`${event.shop?.avatar?.url}`}
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
                <div
                  className={`${styles.button} !w-max !h-[40px] px-2 shadow-xl !rounded-xl `}
                  onClick={handleMessageSumbit}
                >
                  <span className=" text-sm text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
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
                <div className="flex items-center mt-4 justify-between pr-3">
                  <div className="flex">
                    <button
                      className="bg-gradient-to-r from-lime-500 to-lime-600 text-[22px] text-black font-bold rounded-sm flex items-center justify-center shadow-lg border w-10"
                      onClick={decreamentCount}
                    >
                      -
                    </button>
                    {cartItems.some((item) => item._id === event._id) ? (
                      <span
                        key={event._id}
                        className="bg-gradient-to-r from-slate-50 to-slate-100 text-black font-bold rounded-sm flex items-center justify-center shadow-lg w-10 "
                      >
                        {cartItems.find((item) => item._id === event._id)
                          ?.quantity || 0}
                      </span>
                    ) : (
                      <span
                        key={event._id}
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
                </div>
                <div
                  className={`${styles.button} !w-max !h-[40px] px-2 shadow-xl !rounded-xl `}
                >
                  <span className=" text-sm text-white flex items-center">
                    Add to Cart{" "}
                    <AiOutlineShoppingCart
                      className="ml-1"
                      onClick={addToCart}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventDetails;
