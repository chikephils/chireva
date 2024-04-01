import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminDashboard from "../../components/Admin/AdminDashboard";
import styles from "../../styles/styles";

const AdminDashboardPage = () => {
  return (
    <>
      <AdminHeader />
      <div className=" mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <AdminSideBar active={1} />
          <div
            className={`w-[78%] ml-[21%] mt-3 h-[85vh] fixed overflow-y-scroll scrollbar-none pb-8 rounded-md shadow-lg  bg-gradient-to-r from-slate-200 to-slate-400 ... px-1 lg:px-2`}
          >
            <AdminDashboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
