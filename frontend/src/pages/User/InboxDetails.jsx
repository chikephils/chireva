import React from "react";
import Inbox from "../../components/Profile/Inbox.jsx";

const InboxDetails = () => {
  return (
    <>
      <div className={`w-full h-full bg-stone-300 fixed pb-4`}>
        <Inbox />
      </div>
    </>
  );
};

export default InboxDetails;
