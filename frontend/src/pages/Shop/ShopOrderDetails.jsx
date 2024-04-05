import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import Footer from "../../components/Layout/Footer";
import OrderDetails from "../../components/Shop/OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="bg-gradient-to-r from-slate-200 to-slate-400 ...">
        <OrderDetails />
      </div>
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
