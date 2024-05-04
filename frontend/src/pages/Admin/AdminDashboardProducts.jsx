import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AdminProducts from "../../components/Admin/AdminProducts.jsx";
import styles from "../../styles/styles.js";

const AdminDashboardProducts = () => {
  return (
    <>
      <AdminHeader active={5} />
      <div className={`${styles.section} w-full flex mt-[62px] `}>
        <div className=" w-[20%] md:w-[20%] 800px:w-[20%] fixed  mt-1  h-[calc(100%-62px)] bg-gradient-to-r from-slate-200 to-slate-400 ...  shadow-md  rounded-md py-4 flex items-center">
          <AdminSideBar active={5} />
          <div
            className={`w-[78%] ml-[21%] h-[calc(100%-62px)] fixed  pb-4 bg-gradient-to-l from-slate-300 to-slate-400 ...  rounded-md shadow-md px-1 py-2`}
          >
            <AdminProducts />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardProducts;
