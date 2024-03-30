import React from "react";
import Refunds from "../../components/Profile/Refunds";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";

const RefundPage = () => {
  return (
    <>
      <Header />
      <div className="mt-[70px] md:mt-[100px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <ProfileSideBar active={3} />
          <div
            className={`w-[78%] ml-[21%] mt-1 lg:mt-3 320px:h-[85vh] 375px:h-[87vh] 400px:h-[89vh] 600px:h-[91vh] lg:h-[88vh] fixed overflow-y-scroll scrollbar-none pb-8 bg-gradient-to-r from-slate-200 to-slate-400 ... rounded-md shadow-md px-1 md:px-2 lg:px-4`}
          >
            <Refunds />
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPage;
