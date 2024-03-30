import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import CreateEvent from "../../components/Shop/CreateEvent";
import styles from "../../styles/styles";
const ShopCreateEvent = () => {
  return (
    <>
      <DashBoardHeader />
      <div className=" mt-[82px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={6} />
          <div
            className={`w-[78%] ml-[21%] mt-3 320px:h-[82vh] 375px:h-[85vh] 600px:h-[86vh] lg:h-[88vh] fixed overflow-y-scroll scrollbar-none rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg pb-8`}
          >
            <CreateEvent />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCreateEvent;
