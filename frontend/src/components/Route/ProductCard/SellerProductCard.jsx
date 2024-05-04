import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus, HiShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../../Assests/img/emptyCart.svg";
import { MdDeleteForever } from "react-icons/md";
import {
  reduceItemQuantity,
  increaseItemQuantity,
  removeFromCart,
  itemsInCart,
  clearCart,
} from "../../features/cart/cartSlice";
import { numbersWithCommas } from "../../utils/priceDisplay";

const Cart = ({ setOpenCart }) => {
  const [total, setTotal] = useState(0);
  const cartItems = useSelector(itemsInCart);
  const dispatch = useDispatch();
  const editedTotal = numbersWithCommas(total);

  useEffect(() => {
    let totalPrice = cartItems?.reduce(function (accumulator, item) {
      return accumulator + item.discountPrice * item.quantity;
    }, 0);
    setTotal(totalPrice.toFixed(2));
  }, [total, cartItems]);

  const emptyCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0000004b] z-50 flex items-start justify-end">
      <div className="relative w-[70%] 800px:w-[40%] bg-gradient-to-r from-slate-200 to-slate-300 flex flex-col justify-between shadow-xl rounded-lg h-full pb-1">
        <div className="w-full h-[40px] flex items-center justify-between px-1 bg-gradient-to-r from-red-300 to-red-500 ...">
          <div>
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* Item length*/}
          <div className={`${styles.normalFlex}`}>
            <HiShoppingBag size={25} />
            <h5 className="text-[20px] font-[500px]">{cartItems.length}</h5>
          </div>

          {/* Clear Cart */}
          <div>
            <MdDeleteForever
              size={25}
              className="cursor-pointer"
              onClick={emptyCart}
            />
          </div>
        </div>

        {/*Cart items */}

        {cartItems && cartItems.length > 0 ? (
          <>
            <div className="w-full h-[84vh] py-2  flex flex-col overflow-y-scroll scrollbar-none p-1 ">
              {cartItems &&
                cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
            </div>

            {/*Checkout Buttons */}
            <Link to="/checkout" className="px-1">
              <div className=" h-[45px] flex items-center justify-center w-[100%] bg-gradient-to-r from-red-400 to-red-600 ... rounded-[5px] cursor-pointer">
                <h1 className="text-[#fff] text-[18px] font-[600]">
                  Checkout &#x20A6; {editedTotal}
                </h1>
              </div>
            </Link>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
            <p className="text-md md:text-xl text-textColor font-semibold">
              {" "}
              Your Cart is empty
            </p>
            <img src={EmptyCart} className="w-50" alt="" />
            <p className="text-textColor font-semibold text-center">
              Add some item to your Cart
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CartItem = ({ item }) => {
  const editedDiscountPrice = numbersWithCommas(item?.discountPrice);
  const dispatch = useDispatch();
  const totalPrice = item.discountPrice * item.quantity;
  const editedTotalPrice = numbersWithCommas(totalPrice);

  const add = () => {
    dispatch(increaseItemQuantity({ item }));
  };

  const reduce = () => {
    dispatch(reduceItemQuantity({ item }));
  };

  const remove = () => {
    dispatch(removeFromCart({ item }));
  };

  return (
    <div className=" border-[1.5px] border-black bg-gradient-to-r from-slate-300 to-yellow-200 ... w-full p-1 rounded-lg flex  justify-between min-h-[100px] shadow-lg my-2 ">
      <div className="flex-col flex items-center justify-between ">
        <div
          className={`bg-black border rounded-full h-[25px] w-[25px] 800px:w-[25px] 800px:h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
          onClick={add}
        >
          <HiPlus size={14} className=" font-semibold" color="fff" />
        </div>
        <span className=" flex justify-center">{item.quantity}</span>
        <div
          className="bg-black rounded-full w-[25px] 800px:w-[25px] 800px:h-[25px] h-[25px] font-semibold flex items-center justify-center cursor-pointer"
          onClick={reduce}
        >
          <HiOutlineMinus size={14} className=" font-semibold" color="#fff" />
        </div>
      </div>

      <div className="flex justify-center items-center w-[30%]">
        <img
          src={`${item.images && item.images[0]?.url}`}
          alt="img"
          className="max-w-[60px] max-h-[50px]  600px:max-w-[100px] 600px:max-h-[70px] 800px:max-w-[130px] 800px:max-h-[80px] "
        />
      </div>

      <div className="w-[50%] ">
        <p className="text-[14px] md:text-[16px] text-black font-semibold">
          {item.name.slice(0, 15)}..
        </p>
        <p className=" text-[14px] md:text-[16px] text-black font-medium">
          &#x20A6; {editedDiscountPrice} x {item?.quantity}
        </p>
        <h4 className="text-[600] font-Roboto text-[14px] font-medium text-red-600">
          &#x20A6; {editedTotalPrice}
        </h4>
      </div>
      <div className="flex items-center justify-end">
        <RxCross1 className="cursor-pointer" size={18} onClick={remove} />
      </div>
    </div>
  );
};

export default Cart;
