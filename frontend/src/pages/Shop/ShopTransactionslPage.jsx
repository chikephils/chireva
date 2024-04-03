import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import styles from "../../styles/styles";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import ShopTransactions from "../../components/Shop/ShopTransactions";

const ShopTransactionslPage = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[62px]">
        <div className={`${styles.section} w-full flex pb-6`}>
          <DashBoardSideBar active={11} />
          <div
            className={`w-[78%] ml-[21%] mt-1  h-full fixed  pb-4 rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg px-1 md:px-2 lg:px-4 `}
          >
            <ShopTransactions />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopTransactionslPage;
