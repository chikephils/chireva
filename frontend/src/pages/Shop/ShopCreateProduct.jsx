import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct";
import styles from "../../styles/styles";
const ShopCreateProduct = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[82px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={4} />
          <div
            className={`w-[78%] ml-[21%] mt-3  320px:h-[82vh] 375px:h-[85vh] 600px:h-[86vh] lg:h-[88vh] fixed overflow-y-scroll scrollbar-none rounded-md  pb-8 bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg `}
          >
            <CreateProduct />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreateProduct;
