import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import EventDetails from "./EventDetails";
import { Link } from "react-router-dom";

const EventCard = ({ active, event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();

  const add = () => {
    setInCart(!inCart);
    dispatch(addToCart({ item: event }));
  };

  const remove = () => {
    setInCart(!inCart);
    dispatch(removeFromCart({ item: event }));
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (
      cartItems.length > 0 &&
      cartItems.find((item) => item._id === event._id)
    ) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [event?._id]);

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } 800px:flex p-2`}
    >
      <div className=" 800px:w-[40%] flex items-center justify-center">
        <img
          src={`${event?.images && event?.images[0]?.url}`}
          alt="img"
          className="max-h-[100px] 800px:max-h-[250px]"
        />
      </div>
      <div className="w-full 800px:[w-40%] flex flex-col justify center">
        <h2 className="text-[18px] md:text-[20px] 800px:text-[25px] font-semibold pb-2">
          {" "}
          {event?.name}
        </h2>
        <p className=" text-[14px] md:text-[14px] 800px:text-[16px] font-Roboto md:pb-2">
          {event?.description.slice(0, 100)}...
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <p className={`${styles.productDiscountPrice}`}>
              &#x20A6;{event?.discountPrice}
            </p>
            <p className={`${styles.price}`}>&#x20A6;{event?.originalPrice}</p>
          </div>
          <div>
            <span className="pr-3 font-bold text-[15px] 800px:text-[17px] text-lime-600">
              {event?.sold_out}
            </span>
          </div>
        </div>
        <CountDown event={event} />
        <div className="flex">
          <Link to={`/product/${event?._id}?isEvent=true`}>
            <div
              className={`${styles.button} !w-max !h-[45px]  px-2 shadow-xl !rounded-xl mr-3`}
            >
              <span className="text-sm text-white flex items-center">
                See Details <AiOutlineEye size={20} className="ml-1" />{" "}
              </span>
            </div>
          </Link>

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
          {isOpen ? (
            <EventDetails
              setIsOpen={setIsOpen}
              event={event}
              addToCart={add}
              removeFromCart={remove}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
