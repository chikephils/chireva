import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
import styles from "../../styles/styles";

const ShopCreateProduct = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[82px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={7} />
          <div
            className={`w-[78%] ml-[21%] mt-3 320px:h-[82vh] 375px:h-[85vh] 600px:h-[86vh] lg:h-[88vh] fixed overflow-y-scroll scrollbar-none rounded-md shadow-md pb-8 bg-slate-200`}
          >
            <WithdrawMoney />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreateProduct;
