import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminProducts from "../../components/Admin/AdminProducts.jsx";
import styles from "../../styles/styles.js";

const AdminDashboardProducts = () => {
  return (
    <>
      <AdminHeader active={5} />
      <div className="mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <AdminSideBar active={5} />
          <div
            className={`w-[78%] ml-[21%] mt-2 h-[87vh] fixed overflow-y-scroll scrollbar-none pb-10 rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg px-1 md:px-2 `}
          >
            <AdminProducts />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardProducts;
