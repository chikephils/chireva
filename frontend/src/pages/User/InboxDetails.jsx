import React from "react";
import Header from "../../components/Layout/Header";
import Inbox from "../../components/Profile/Inbox.jsx";

const InboxDetails = () => {
  return (
    <>
      <Header />
      <div className={`w-full mt-[62px] md:mt-[100px] fixed bg-gradient-to-r from-slate-50 to-slate-100 ...`}>
        <Inbox />
      </div>
    </>
  );
};

export default InboxDetails;
