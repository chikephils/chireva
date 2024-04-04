import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import styles from "../../styles/styles";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminWithdrawRequest from "../../components/Admin/AdminWithdrawRequest.jsx";

const AdminWithdrawalRequest = () => {
  return (
    <>
      <AdminHeader />
      <div className={`${styles.section} w-full flex mt-[62px] md:mt-[100px] `}>
        <div className=" w-[20%] md:w-[20%] lg:w-[20%] fixed  mt-1 lg:mt-3 h-[calc(100%-62px)] bg-gradient-to-r from-slate-200 to-slate-400 ...  shadow-md  rounded-md py-4 flex items-center">
          <AdminSideBar active={8} />
          <div
            className={`w-[78%] ml-[21%] mt-1 lg:mt-3 h-[calc(100%-62px)] fixed  pb-4 bg-gradient-to-l from-slate-300 to-slate-400 ...  rounded-md shadow-md px-1 md:px-2 py-2`}
          >
            <AdminWithdrawRequest />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWithdrawalRequest;
