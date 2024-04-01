import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero.jsx";
import styles from "../../styles/styles.js";
const ShopDashboardPage = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[82px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={1} />
          <div
            className={`w-[78%] ml-[21%] mt-3  h-[78vh] fixed overflow-y-scroll scrollbar-none pb-8 rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg px-1 md:px-2`}
          >
            <DashboardHero />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDashboardPage;
