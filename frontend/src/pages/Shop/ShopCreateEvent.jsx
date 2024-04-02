import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import CreateEvent from "../../components/Shop/CreateEvent";
import styles from "../../styles/styles";
const ShopCreateEvent = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={6} />
          <div
            className={`w-[78%] ml-[21%] mt-2 h-[87vh] fixed overflow-y-scroll scrollbar-none pb-10 rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg px-1 md:px-2 `}
          >
            <CreateEvent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreateEvent;
