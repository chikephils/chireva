import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminSellers from "../../components/Admin/AdminSellers";
import styles from "../../styles/styles";

const AdminDashboardSellers = () => {
  return (
    <>
      <AdminHeader />
      <div className=" mt-[82px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <AdminSideBar active={3} />
          <div
            className={`w-[78%] ml-[21%] mt-3  320px:h-[82vh] 375px:h-[85vh] 600px:h-[86vh] lg:h-[88vh] fixed overflow-y-scroll scrollbar-none pb-8 bg-gradient-to-r from-slate-200 to-slate-400 ... shadow-lg rounded-md`}
          >
            <AdminSellers />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardSellers;
