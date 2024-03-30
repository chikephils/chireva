import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import TrackOrder from "../../components/Profile/TrackOrder";

const TrackingDetailsPage = () => {
  return (
    <>
      <Header />
      <div className="mt-[70px] md:mt-[100px] bg-gradient-to-r from-slate-200 to-slate-300 ...">
        <TrackOrder />
      </div>
      <Footer />
    </>
  );
};

export default TrackingDetailsPage;
