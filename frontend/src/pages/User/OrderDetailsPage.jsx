import React from "react";
import OrderDetails from "../../components/Profile/OrderDetails";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const OrderDetailsPage = () => {
  return (
    <div>
      <Header />
      <div className="bg-gradient-to-r from-slate-200 to-slate-400 ...">
      <OrderDetails />
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
