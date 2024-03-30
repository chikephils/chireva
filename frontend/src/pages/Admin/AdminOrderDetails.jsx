import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAdminOrders } from "../../features/admin/adminSlice";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { backend_url } from "../../server";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const orders = useSelector(selectAdminOrders);

  const navigate = useNavigate();

  const order = orders && orders.find((order) => order._id === id);

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
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
              onClick={() => navigate("/admin/orders")}
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
              className="w-full flex justify-between mb-1 p-1 border border-gray-300"
              key={index}
            >
              <div className="w-[30%]">
                <div className="flex items-center justify-center">
                  <img
                    src={`${backend_url}${item.images[0]}`}
                    alt=""
                    className="max-w-[60px] max-h-[60px] "
                  />
                </div>
              </div>

              <div className="w-[40%] justify-start items-center">
                {" "}
                <h5 className="text-[14px] md:text-[15px] 600px:text-[16px] lg:text-[18px]">
                  {item.name}
                </h5>
                <h5 className="text-[12px] md:text-[13px] 600px:text-[14px] lg:text-[16px] ">
                  &#x20A6; {item.discountPrice} X {item.quantity}
                </h5>
              </div>
            </div>
          );
        })}

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
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
