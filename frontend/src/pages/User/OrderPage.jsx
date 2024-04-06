import React from "react";
import AllOrders from "../../components/Profile/AllOrders";
import styles from "../../styles/styles";
import Header from "../../components/Layout/Header";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";

const OrderPage = () => {
  return (
    <>
      <Header />
      <div className={`${styles.section} w-full flex mt-[62px] md:mt-[100px] `}>
        <div className=" w-[20%] md:w-[20%] lg:w-[20%] fixed  mt-1 h-[calc(100%-62px)] md:h-[calc(100%-100px)] bg-gradient-to-r from-slate-200 to-slate-400 ...  shadow-md  rounded-md py-4 flex items-center">
          <ProfileSideBar active={2} />
        </div>
        <div
          className={`w-[78%] ml-[21%] mt-1 lg:mt-3 h-[calc(100%-62px)] md:h-[calc(100%-100px)] fixed  pb-4 bg-gradient-to-r from-slate-300 to-yellow-200 ...  rounded-md shadow-md px-1 py-2`}
        >
          <AllOrders />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
