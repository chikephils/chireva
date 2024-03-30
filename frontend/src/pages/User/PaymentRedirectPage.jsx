import React from "react";
import PaymentRedirect from "../../components/Payment/PaymentRedirect";


const PaymentRedirectPage = () => {
  return (
    <>
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
        <div className="w-full h-screen overflow-y-scroll scrollbar-none bg-gray-200 rounded-md shadow-2xl relative p-2 py-3 ">
          <br />
          <br />
          <PaymentRedirect />
          <br />
        </div>
      </div>
    </>
  );
};

export default PaymentRedirectPage;
