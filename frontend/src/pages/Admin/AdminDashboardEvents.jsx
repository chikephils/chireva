import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminEvents from "../../components/Admin/AdminEvents.jsx";
import styles from "../../styles/styles.js";

const AdminDashboardEvents = () => {
  return (
    <>
      <AdminHeader active={6} />
      <div className="mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <AdminSideBar active={6} />
          <div
            className={`w-[78%] ml-[21%] mt-3 h-[85vh] fixed overflow-y-scroll scrollbar-none pb-8 rounded-md shadow-lg  bg-gradient-to-r from-slate-200 to-slate-400 ... px-1 lg:px-2`}
          >
            <AdminEvents />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardEvents;
