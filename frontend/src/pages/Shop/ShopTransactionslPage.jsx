import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import styles from "../../styles/styles";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import ShopTransactions from "../../components/Shop/ShopTransactions";

const ShopTransactionslPage = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[82px]">
        <div className={`${styles.section} w-full flex pb-6`}>
          <DashBoardSideBar active={11} />
          <div
            className={`w-[78%] ml-[21%] mt-3  320px:h-[82vh] 375px:h-[85vh] 600px:h-[86vh] lg:h-[88vh] fixed overflow-y-scroll scrollbar-none pb-4 bg-gradient-to-l from-slate-200 to-slate-300 ...`}
          >
            <ShopTransactions />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopTransactionslPage;
