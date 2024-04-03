import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminSellers from "../../components/Admin/AdminSellers";
import styles from "../../styles/styles";

const AdminDashboardSellers = () => {
  return (
    <>
      <AdminHeader />
      <div className=" mt-[62px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <AdminSideBar active={3} />
          <div
            className={`w-[78%] ml-[21%] mt-1  h-full fixed  pb-4 rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg px-1 md:px-2 lg:px-4 `}
          >
            <AdminSellers />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardSellers;
