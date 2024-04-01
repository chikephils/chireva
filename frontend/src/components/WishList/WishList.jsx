import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "../../Assests/img/emptyCart.svg";
import { MdDeleteForever } from "react-icons/md";
import {
  removeFromWishList,
  selectWishListItems,
  clearWishList,
} from "../../features/wishlist/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";

const WishList = ({ setOpenWishList }) => {
  const wishList = useSelector(selectWishListItems);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let totalPrice = wishList?.reduce(function (accumulator, item) {
      return accumulator + item.discountPrice;
    }, 0);
    setTotal(totalPrice);
  }, [total, wishList]);

  const emptyWishListHandler = () => {
    dispatch(clearWishList());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0000004b] z-50 flex items-start justify-end">
      <div className="relative w-[70%] lg:w-[40%] bg-gradient-to-r from-slate-200 to-slate-300 flex flex-col justify-between shadow-xl rounded-lg h-[94vh]">
        <div className="w-full h-[8vh] flex items-center justify-between px-1 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-t-lg">
          <div>
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishList(false)}
            />
          </div>

          <div className={`${styles.normalFlex} `}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-1 text-[20px] font-[500px]">
              {wishList.length > 1
                ? `${wishList.length} Items`
                : `${wishList.length} Item`}
            </h5>
          </div>

          <div>
            <MdDeleteForever
              size={25}
              className="cursor-pointer"
              onClick={emptyWishListHandler}
            />
          </div>
        </div>

        {/*Wish LIst items */}
        {wishList && wishList.length > 0 ? (
          <div className="w-full  rounded-lg flex flex-col pb-1">
            <div className="w-full h-[78vh] py-2 flex flex-col gap-1 overflow-y-scroll scrollbar-none pl-1 ">
              {wishList &&
                wishList.map((item) => <CartItem key={item._id} item={item} />)}
            </div>

            <div className="px-1 ">
              <div className="h-[7vh] flex items-center justify-center w-[100%] bg-gradient-to-r from-cyan-400 to-blue-500 ...rounded-xl p-2 rounded-lg">
                <h1 className="text-black text-[18px] font-[600]">
                  Total &#x20A6; {total.toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4">
            <p className="text-md md:text-xl text-textColor font-semibold">
              {" "}
              Your Wishlist is empty
            </p>
            <img src={EmptyCart} className="w-50" alt="" />
            <p className="text-textColor font-semibold text-center">
              Add some item to your wishlist
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const removeFromWishListHandler = () => {
    dispatch(removeFromWishList({ item: item }));
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ item: item }));
  };
  const totalPrice = item.discountPrice
    ? item.discountPrice
    : item.originalPrice;

  return (
    <div className=" w-full border-[2px] rounded-lg p-1 lg:p-2 flex justify-between min-h-[60px] bg-gradient-to-r from-lime-300 to-blue-400 ...">
      <div className=" flex items-center justify-start">
        <RxCross1
          className=" flex items-center cursor-pointer font-bold"
          onClick={removeFromWishListHandler}
        />
      </div>
      <div className=" flex w-[30%]">
        <img
          src={`${item.images && item.images[0]?.url}`}
          alt="img"
          className="max-w-[50px] h-[50px] md:max-w-[60px] md:h-[60px] lg:max-w-[80px] lg:h-[80px] ml-2"
        />
      </div>
      <div className="w-[40%]">
        <h1 className="text-sm md:text-base">{item?.name}</h1>
        <h4 className="text-sm md:text-base font-Roboto  pt-[3px] text-red-600">
          &#x20A6;{totalPrice}
        </h4>
      </div>
      <div className="flex items-center justify-end pr-1">
        <BsCartPlus
          size={20}
          className="cursor-pointer"
          title="Add to Cart"
          onClick={addToCartHandler}
        />
      </div>
    </div>
  );
};

export default WishList;
