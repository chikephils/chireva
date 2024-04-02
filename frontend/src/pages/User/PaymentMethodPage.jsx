import React from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import PaymentMethods from "../../components/Profile/PaymentMethods";

const PaymentMethodPage = () => {
  return (
    <>
      <Header />
      <div className="mt-[62px] md:mt-[100px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <ProfileSideBar active={5} />
          <div
            className={`w-[78%] ml-[21%] mt-1 lg:mt-3 h-[90vh] fixed overflow-y-scroll scrollbar-none pb-8 bg-gradient-to-r from-slate-200 to-slate-400 ... rounded-md shadow-md px-1 md:px-2 lg:px-4`}
          >
            <PaymentMethods />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodPage;
