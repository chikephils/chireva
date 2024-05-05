import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { selectSeller } from "../../features/shop/shopSlice";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllShopOrders,
  selectAllShopOrders,
} from "../../features/shop/shopSlice";
import { server } from "../../server";
import SmallLoader from "../Layout/SmallLoader";
import { numbersWithCommas } from "../../utils/priceDisplay";

const OrderDetails = () => {
  const seller = useSelector(selectSeller);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const orders = useSelector(selectAllShopOrders);
  const sellerToken = useSelector((state) => state.shop.sellerToken);

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
  }, [dispatch, seller._id]);

  const order = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      } else {
        toast.error("Failed to update order.");
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const refundOrderUpdateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Refund Successful!");
        navigate("/dashboard-orders");
      } else {
        toast.error("Failed to Refund Order");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`py-4 min-h-screen mt-[80px] 800px:mt-[90px] ${styles.section}`}
    >
      <div className="w-full h-[35px] bg-green-400 sticky top-0">
        <div className="flex justify-between p-2">
          <div className=" flex">
            <BsFillBagFill size={24} color="crimson" />
          </div>
          <div className="flex items-center">
            <h1 className="flex text-[18px] 800px:text-[20px]">
              Order Details
            </h1>
          </div>
          <div className="flex">
            <RxCross1
              size={24}
              className=" cursor-pointer bg-red-500"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-2 p-2">
        <h5 className="text-[00000084] text-[14px] md:text-[16px] 800px:text-[base]">
          {" "}
          Order ID: <span>#{order?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084] text-[14px] md:text-[16px] 800px:text-[base]">
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
              className="w-full flex justify-between mb-1 p-1 border border-gray-300"
              key={index}
            >
              <div className="w-[30%]">
                <div className="flex items-center justify-center">
                  <img
                    src={`${item.images && item?.images[0]?.url}`}
                    alt=""
                    className="max-w-[60px] max-h-[60px] "
                  />
                </div>
              </div>

              <div className="w-full items-center">
                {" "}
                <h5 className="text-[14px] md:text-[15px] 600px:text-[16px] 800px:text-[18px] pl-3 ">
                  {item?.name}
                </h5>
                <h5 className="text-[12px] md:text-[13px] 600px:text-[14px] 800px:text-[16px] pl-3 ">
                  &#x20A6; {numbersWithCommas(item?.discountPrice)} x{" "}
                  {item.quantity}
                </h5>
              </div>
            </div>
          );
        })}

      <div className="w-full border-t text-right pr-2 mb-2">
        <h5 className="pt-2 text-[16px] 800px:text-[18px]">
          Total Price:{" "}
          <strong>
            {" "}
            &#x20A6;{" "}
            {numbersWithCommas(
              order?.cart.reduce(
                (acc, item) => acc + item.discountPrice * item.quantity,
                0
              )
            )}
          </strong>
        </h5>
      </div>

      <div className="w-full 600px:flex 800px:flex items-center p-2">
        <div className="w-full 800px:w-[30%]">
          <h4 className=" text-[16px] md:text-[18px] 800px:text-[20px] font-semibold">
            Shipping Address :
          </h4>
          <h4 className="text-[14px] md:text-[16px] 800px:text-[16px]">
            {order.shippingAddress.street}
          </h4>
          <h4 className="text-[14px] md:text-[16px] 800px:text-[16px]">
            {order.shippingAddress.city}
          </h4>
          <h4 className="text-[14px] md:text-[16px] 800px:text-[16px]">
            {order.shippingAddress.state}
          </h4>
          <h4 className="text-[14px] md:text-[16px] 800px:text-[16px]">
            {order.shippingAddress.country}
          </h4>
          <h4 className="text-[14px] md:text-[16px] 800px:text-[16px]">
            {order.user.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[30%] pt-3 800px:pt-0">
          <h4 className="text-[16px] md:text-[18px] 800px:text-[20px] font-semibold">
            Payment Info
          </h4>
          <h4>
            Status: {order?.paymentInfo?.status === true ? "Paid" : "Not Paid"}
          </h4>
        </div>
        <br />
        <div className="">
          <h4 className="text-[16px] md:text-[18px] 800px:text-[18px] font-semibold">
            Order Status:
          </h4>
          {order?.status !== "Processing Refund" &&
            order?.status !== "Refund Success" && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-[170px] mt-2 border h-[35px] rounded-[5px] cursor-pointer"
              >
                {[
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ]
                  .slice(
                    [
                      "Processing",
                      "Transferred to delivery partner",
                      "Shipping",
                      "Received",
                      "On the way",
                      "Delivered",
                    ].indexOf(order?.status)
                  )
                  .map((option, index) => (
                    <option
                      value={option}
                      className="text-[12px] 800px:text-[14px] font-normal cursor-pointer"
                      key={index}
                    >
                      {option}
                    </option>
                  ))}
              </select>
            )}

          {order?.status === "Processing Refund" ||
          order?.status === "Refund Success" ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[170ppx] mt-2 border h-[35px] rounded-[5px] cursor-pointer"
            >
              {["Processing Refund", "Refund Success"]
                .slice(
                  ["Processing Refund", "Refund Success"].indexOf(order?.status)
                )
                .map((option, index) => (
                  <option
                    value={option}
                    key={index}
                    className="text-[12px] 800px:text-[14px] font-normal cursor-pointer"
                  >
                    {option}
                  </option>
                ))}
            </select>
          ) : null}

          {order?.status !== "Refund Success" &&
            order?.status !== "Delivered" && (
              <div className=" 800px:pl-2">
                <div
                  className={`${styles.button}  !w-max p-1  !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[35px] text-[14px]`}
                  onClick={
                    order?.status !== "Processing Refund"
                      ? orderUpdateHandler
                      : refundOrderUpdateHandler
                  }
                >
                  {loading ? <SmallLoader /> : "Update Status"}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
