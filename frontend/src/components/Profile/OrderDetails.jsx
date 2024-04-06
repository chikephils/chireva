import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import {
  getAllOrders,
  selectAllOrders,
} from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { getAllProducts } from "../../features/product/productSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../Layout/SmallLoader";

const OrderDetails = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrders);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { id } = useParams();

  const order = orders && orders.find((item) => item._id === id);

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getAllOrders(user._id));
  }, [id, user._id, dispatch]);

  console.log(order);

  const reviewHandler = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await axios.put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedProduct?._id,
          orderId: order._id,
        },
        { withCredentials: true }
      );

      return toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(getAllOrders(user._id));
      dispatch(getAllProducts());
      setComment("");
      setRating("");
      setLoader(false);
      setIsOpen(false);
    }
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${order._id}`, {
        status: "Processing Refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrders(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div
      className={`py-4 min-h-screen mt-[60px] lg:mt-[100px]  ${styles.section}`}
    >
      <div className="w-full h-[35px] bg-green-400 sticky ">
        <div className="flex justify-between p-2">
          <div className=" flex">
            <BsFillBagFill size={24} color="crimson" />
          </div>
          <div className="flex items-center">
            <h1 className="flex text-[18px] lg:text-[20px]">Order Details</h1>
          </div>
          <div className=" flex">
            <RxCross1
              size={24}
              className=" cursor-pointer bg-red-500"
              onClick={() => navigate("/profile/orders")}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-2 p-2">
        <h5 className="text-[00000084] text-[14px] md:text-[16px] lg:text-[base]">
          {" "}
          Order ID: <span>#{order?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084] text-[14px] md:text-[16px] lg:text-[base]">
          {" "}
          Placed on: <span>{order?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      {/* order Items */}
      <br />
      {order &&
        order?.cart.map((item, index) => {
          return (
            <div
              className="w-full flex justify-between mb-1 p-1 border border-black rounded-md bg-gradient-to-r from-slate-200 to-yellow-300 ..."
              key={index}
            >
              <div className="w-[30%]">
                <div className="flex items-center justify-center">
                  <img
                    src={`${item.images && item.images[0]?.url}`}
                    alt=""
                    className="max-w-[60px] max-h-[60px] "
                  />
                </div>
              </div>

              <div className="w-[40%] justify-start items-center">
                {" "}
                <h5 className="text-[14px] md:text-[15px] 600px:text-[16px] lg:text-[18px] font-semibold">
                  {item.name}
                </h5>
                <h5 className="text-[12px] md:text-[13px] 600px:text-[14px] lg:text-[16px] font-semibold ">
                  &#x20A6; {item?.discountPrice} x {item.quantity}
                </h5>
              </div>
              {!item.isReviewed && order.status === "Delivered" ? (
                <>
                  <div
                    className="flex items-center"
                    onClick={() => setIsOpen(true) || setSelectedProduct(item)}
                  >
                    <div
                      className={`${styles.button} !h-[40px] w-max  text-[#fff] !text-[14px] md:!text-[14px] lg:!text-[16px] !p-1 !shadow-lg`}
                    >
                      <span className=""> Write Review</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          );
        })}

      {/* Review Popup */}
      {isOpen && (
        <div>
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
            <div className="w-[90%] lg:w-[70%] h-[90vh] md:h-[90vh] overflow-y-scroll scrollbar-none lg:h-[75vh] bg-gradient-to-r from-slate-50 to-slate-100 ... rounded-md shadow-2xl relative ">
              <div className="w-full h-[35px] bg-green-400 sticky top-0  z-50 ">
                <div className="flex justify-between p-2">
                  <div className="flex items-center">
                    <h1 className="flex text-[16px] lg:text-[20px]">
                      Review Product
                    </h1>
                  </div>
                  <div className=" flex">
                    <RxCross1
                      size={24}
                      className=" cursor-pointer bg-red-500"
                      onClick={toggle}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="flex">
                <img
                  src={`${selectedProduct.images[0].url}`}
                  alt=""
                  className="max-w-[60px] max-h-[60px] pl-2 "
                />
                <div>
                  <div className="pl-3 text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
                    {selectedProduct?.name}
                  </div>
                  <h4 className="pl-3 text-[14px] md:text-[16px] lg:text-[18px] font-normal ">
                    &#x20A6; {selectedProduct?.discountPrice} x{" "}
                    {selectedProduct?.quantity}
                  </h4>
                </div>
              </div>

              {/* ratings */}
              <div className="w-full p-2">
                <h5>
                  Give a Rating <span className="text-red-500">*</span>
                </h5>
                <div className="flex w-full  pt-2">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
                <br />
                <div className="w-full">
                  <label className="block text-[16px] md:text-[18px] lg:text-[20px] font-[500]">
                    Write a comment
                    <span className="ml-1 font-[400] text-[14px] md:text-[16px] lg:text-[18px] text-[#00000052]">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="comment"
                    id=""
                    cols="20"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was your product? write your expresion about it!"
                    className="mt-2 w-[95%] border p-2 outline-none shadow-lg"
                  ></textarea>
                </div>
                <div
                  className={`${styles.button} !h-[40px] p-2 w-max text-white text-[18px] !shadow-lg`}
                  onClick={rating > 1 ? reviewHandler : null}
                >
                  {loader ? <SmallLoader /> : "Submit"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right pr-2 mb-2">
        <h5 className="pt-2 text-[16px] lg:text-[18px]">
          Total Price:{" "}
          <strong>
            {" "}
            &#x20A6;{" "}
            {order?.cart.reduce(
              (acc, item) => acc + item.discountPrice * item.quantity,
              0
            )}
          </strong>
        </h5>
      </div>
      <div className="w-full 600px:flex lg:flex items-center p-2">
        <div className="w-full lg:w-[60%]">
          <h4 className=" text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
            Shipping Address :
          </h4>
          <h4 className="text-[14px] md:text-[16px] lg:text-[16px]">
            {order?.shippingAddress?.street}
          </h4>
          <h4 className="text-[14px] md:text-[16px] lg:text-[16px]">
            {order?.shippingAddress?.city}
          </h4>
          <h4 className="text-[14px] md:text-[16px] lg:text-[16px]">
            {order?.shippingAddress?.state}
          </h4>
          <h4 className="text-[14px] md:text-[16px] lg:text-[16px]">
            {order?.shippingAddress?.country}
          </h4>
          <h4 className="text-[14px] md:text-[16px] lg:text-[16px]">
            {order?.user?.phoneNumber}
          </h4>
        </div>
        <div className="w-full lg:w-[40%] pt-3 mb-3">
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
            Payment Status:
          </h4>
          <h4>{order?.paymentInfo?.status === true ? "Paid" : "Not Paid"}</h4>
          <br />
          <h4 className="text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
            Order Status:
          </h4>
          <h4>{order?.status}</h4>
          {order.status === "Delivered" && (
            <div
              className={`${styles.button} !h-[40px] w-max  text-[#fff] !text-[14px] md:text-[14px] lg:text-[16px] !p-1 !shadow-lg`}
              onClick={refundHandler}
            >
              Give a Refund
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
