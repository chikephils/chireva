import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import AllRefunds from "../../components/Shop/AllRefunds";
import styles from "../../styles/styles";

const ShopAllOrders = () => {
  return (
    <>
      <DashBoardHeader />
      <div className={`${styles.section} w-full flex mt-[62px]`}>
        <div className=" w-[20%] md:w-[20%] 800px:w-[20%] fixed  mt-1 h-[calc(100%-62px)] bg-gradient-to-r from-slate-200 to-slate-400 ...  shadow-md  rounded-md py-4 flex items-center">
          <DashBoardSideBar active={10} />
          <div
            className={`w-[78%] ml-[21%] h-[calc(100%-62px)] fixed  pb-4 bg-gradient-to-l from-slate-300 to-slate-400 ...  rounded-md shadow-md px-1 md:px-2 py-2`}
          >
            <AllRefunds />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAllOrders;
