import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import styles from "../../styles/styles";
import AllEvents from "../../components/Shop/AllEvents";

const ShopAllEvents = () => {
  return (
    <>
      <DashBoardHeader active={5} />
      <div className=" mt-[82px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={5} />
          <div
            className={`w-[78%] ml-[21%] mt-3  h-[78vh] fixed overflow-y-scroll scrollbar-none rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg pb-8`}
          >
            <AllEvents />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopAllEvents;
