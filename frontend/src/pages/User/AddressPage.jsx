import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import Address from "../../components/Profile/Address";
import CreateAddress from "../../components/Profile/CreateAddress";

const AddressPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header />
      <div className="mt-[62px] md:mt-[100px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <ProfileSideBar active={8} />
          <div
            className={`w-[78%] ml-[21%] mt-1 lg:mt-3  h-full fixed  pb-4 bg-gradient-to-r from-slate-300 to-yellow-200 ...  rounded-md shadow-md px-1 md:px-2 lg:px-4`}
          >
            <Address setOpen={setOpen} />
          </div>
        </div>
      </div>
      {open && <CreateAddress setOpen={setOpen} />}
    </>
  );
};

export default AddressPage;
