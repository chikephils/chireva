import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import styles from "../../styles/styles";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminWithdrawRequest from "../../components/Admin/AdminWithdrawRequest.jsx";

const AdminWithdrawalRequest = () => {
  return (
    <>
      <AdminHeader />
      <div className=" mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <AdminSideBar active={8} />
          <div
            className={`w-[78%] ml-[21%] mt-3 h-[90vh] fixed overflow-y-scroll scrollbar-none pb-8 rounded-md shadow-lg  bg-gradient-to-r from-slate-200 to-slate-400 ... px-1 lg:px-2`}
          >
            <AdminWithdrawRequest />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWithdrawalRequest;
