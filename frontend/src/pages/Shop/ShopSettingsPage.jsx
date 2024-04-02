import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import Settings from "../../components/Shop/Settings";
import styles from "../../styles/styles";

const ShopCreateProduct = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={12} />
          <div
            className={`w-[78%] ml-[21%] mt-3 h-[90vh] fixed overflow-y-scroll scrollbar-none pb-8 bg-gradient-to-l from-slate-300 to-slate-400 ...`}
          >
            <Settings />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreateProduct;
