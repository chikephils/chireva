import React from "react";
import Header from "../../components/Layout/Header";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import Checkout from "../../components/Checkout/Checkout";
import Footer from "../../components/Layout/Footer";


const CheckoutPage = () => {
  return (
    <>
  
      <div className="bg-gray-400 min-h-screen ">
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
