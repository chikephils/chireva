import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../Assests/img/logo.png";
import { AiOutlineGift, AiOutlineShopping } from "react-icons/ai";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";

const DashBoardHeader = ({ active }) => {
  const seller = useSelector((state) => state.shop.seller);

  return (
    <div className="w-full h-[60px] bg-gradient-to-r from-yellow-200 to-lime-400 ... shadow-lg d fixed top-0 left-0 z-50 flex items-center justify-between px-3 mb-2">
      <div className="800px:ml-3">
        <Link to="/dashboard">
          <img src={Logo} alt="logo" className="w-14 h-14" title="Dashboard" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center ">
          <Link to="/dashboard/coupons" className="hidden md:block">
            <AiOutlineGift
              color={`${active === 9 ? "red" : "black"}`}
              size={24}
              className="mx-3 800px:mx-5 cursor-pointer"
              title="Coupons"
            />
          </Link>
          <Link to="/dashboard-events" className="hidden md:block">
            <MdOutlineCalendarMonth
              color={`${active === 5 ? "red" : "black"}`}
              size={24}
              className="mx-3 800px:mx-5 cursor-pointer"
              title="Events"
            />
          </Link>
          <Link to="/dashboard-products" className="hidden md:block">
            <FiPackage
              color={`${active === 4 ? "red" : "black"}`}
              size={24}
              className="mx-3 800px:mx-5 cursor-pointer"
              title="Products"
            />
          </Link>
          <Link to="/dashboard-orders" className="hidden md:block">
            <AiOutlineShopping
              color={`${active === 2 ? "red" : "black"}`}
              size={30}
              className="mx-3 800px:mx-5 cursor-pointer"
              title="Orders"
            />
          </Link>
          <Link to="/dashboard-messages" className="hidden md:block">
            <BiMessageAltDetail
              color={`${active === 8 ? "red" : "black"}`}
              size={24}
              className="mx-3 800px:mx-5 cursor-pointer"
              title="Messages"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              className=" w-[40px] h-[40px] rounded-full object-cover 3 800px:ml-5"
              alt="bmg"
              title="Homepage"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
