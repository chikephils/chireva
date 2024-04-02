import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import AllProducts from "../../components/Shop/AllProducts";
import styles from "../../styles/styles";

const ShopAllProducts = () => {
  return (
    <>
      <DashBoardHeader active={3} />
      <div className=" mt-[62px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <>
            <DashBoardSideBar active={3} />
            <div
              className={`w-[78%] ml-[21%] mt-3  h-[90vh] fixed overflow-y-scroll scrollbar-none rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg pb-8`}
            >
              <AllProducts />
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default ShopAllProducts;
