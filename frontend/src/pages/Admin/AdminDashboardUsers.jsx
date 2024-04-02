import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminUsers from "../../components/Admin/AdminUsers";
import styles from "../../styles/styles";

const AdminDashboardUsers = () => {
  return (
    <>
      <AdminHeader />
      <div className=" mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <AdminSideBar active={4} />
          <div
            className={`w-[78%] ml-[21%] mt-3 h-[90vh] fixed overflow-y-scroll scrollbar-none pb-8 rounded-md shadow-lg  bg-gradient-to-r from-slate-200 to-slate-400 ... px-1 lg:px-2`}
          >
            <AdminUsers />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardUsers;
