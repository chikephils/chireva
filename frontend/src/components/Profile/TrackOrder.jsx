import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllOrders, selectAllOrders } from "../../features/user/userSlice";
import { selectUser } from "../../features/user/userSlice";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const TrackOrder = () => {
  const user = useSelector(selectUser);
  const orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrders(user._id));
  }, [dispatch, user._id]);

  const order = orders && orders.find((item) => item._id === id);

  return (
    <div className="py-4 w-full h-[80vh] justify-center items-center">
      {" "}
      <div className="w-full h-[35px]  sticky mb-4 ">
        <div className="flex justify-between p-2">
          <div className=" flex">
            <MdOutlineTrackChanges size={24} color="crimson" />
          </div>
          <div className="flex items-center">
            <h1 className="flex text-[18px] lg:text-[20px]">
              Tracking Details
            </h1>
          </div>
          <div className=" flex">
            <RxCross1
              size={24}
              className=" cursor-pointer bg-red-500"
              onClick={() => navigate("/profile/track-orders")}
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
      <br />
      <br />
      <div className="w-full flex flex-col items-center justify-center">
        {order && order?.status === "Processing" ? (
          <h1 className="text-[20px] text-center">
            {" "}
            Your Order is Processing in Shop
          </h1>
        ) : order?.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px] text-center">
            Your Order is on the way for delivery partner
          </h1>
        ) : order?.status === "Shipping" ? (
          <h1 className="text-[20px] text-center">
            Your Order is on the way with delivery partner
          </h1>
        ) : order?.status === "Received" ? (
          <h1 className="text-[20px] text-center">
            Your Order is in your city, Our Delivery man will deliver it
          </h1>
        ) : order?.status === "On the Way" ? (
          <h1 className="text-[20px] text-center">
            {" "}
            Our Delivery is on the way to deliver your order.
          </h1>
        ) : order.status === "Delivered" ? (
          <h1 className="text-[20px] text-center text-green-500 font-bold  ">
            Congratulations! Your order was successfully delivered{" "}
          </h1>
        ) : order.status === "Processing refund" ? (
          <h1 className="text-[20px] text-center"> Your Refund is procesing</h1>
        ) : order.status === "Refund Success" ? (
          <h1 className="text-[20px] text-center">
            Your refund is successfully completely!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default TrackOrder;
