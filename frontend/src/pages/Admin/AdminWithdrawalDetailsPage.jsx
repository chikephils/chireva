import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import Footer from "../../components/Layout/Footer";
import AdminWithdrawalDetails from "../../components/Admin/AdminWithdrawalDetails";

const AdminWithdrawalDetailsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="bg-gradient-to-r from-slate-100 to-slate-300 ...">
      <AdminWithdrawalDetails />
      <Footer />
      </div>
    </div>
  );
};

export default AdminWithdrawalDetailsPage;
