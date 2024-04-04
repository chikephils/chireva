import React from "react";
import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteUserAddress } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Address = ({ setOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="h-full">
      <div className="sticky top-2 mb-2 flex items-center justify-between h-[35px]">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black py-2">
          My Address
        </h1>
        <div
          className={`${styles.sm_button} rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white text-sm lg:text-base"> Add New</span>
        </div>
      </div>
      <br />
      {user && user.addresses.length > 0 ? (
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-gradient-to-r from-slate-50 to-slate-100 ... h-[70px] 800px:h-[70px] rounded-[4px] flex items-center justify-between px-1 gap-2  mb-5"
            key={index}
          >
            <h5 className="text-[12px] 400px:text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
              {item.addressType}
            </h5>

            <h6 className="text-[12px] 400px:text-[14px]  md:text-[14px] lg:text-[18px]">
              {item.address1} {item.address2}
            </h6>

            <h6 className="hidden md:flex lg:flex text-[12px]  md:text-[14px] lg:text-[18px]">
              {user && user.phoneNumber}
            </h6>

            <AiOutlineDelete
              size={25}
              className="cursor-pointer "
              onClick={() => handleDelete(item)}
            />
          </div>
        ))
      ) : (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};

export default Address;
