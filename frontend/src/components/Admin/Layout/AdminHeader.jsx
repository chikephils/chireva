import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../features/user/userSlice";
import Logo from "../../../Assests/img/logo.png";
import { BsHandbag } from "react-icons/bs";

const AdminHeader = ({ active }) => {
  const user = useSelector(selectUser);

  return (
    <div className="w-full h-[80px] bg-white fixed top-0 left-0 z-50 flex items-center shadow justify-between px-3 mb-2">
      <div className="lg:ml-3">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-14 h-14" title="Home" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/admin/coupons" className="md:block hidden">
            <AiOutlineGift
              color={`${active === 7 ? "red" : "black"}`}
              size={30}
              className="mx-5 cursor-pointer"
              title="Coupons"
            />
          </Link>
          <Link to="/admin/events" className="md:block hidden">
            <MdOutlineCalendarMonth
              color={`${active === 6 ? "red" : "black"}`}
              size={30}
              className="mx-5 cursor-pointer"
              title="Events"
            />
          </Link>
          <Link to="/admin/products" className="md:block hidden">
            <FiPackage
              color={`${active === 5 ? "red" : "black"}`}
              size={30}
              className="mx-5 cursor-pointer"
              title="Products"
            />
          </Link>
          <Link to="/admin/orders" className="md:block hidden">
            <BsHandbag
              color={`${active === 2 ? "red" : "black"}`}
              size={30}
              className="mx-5 cursor-pointer"
              title="Orders"
            />
          </Link>
          <Link to="/profile">
            <img
              src={`${user.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer"
              title="Profile"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
