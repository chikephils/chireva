import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi2";
import { GiMoneyStack, GiSellCard } from "react-icons/gi";
import { BiSolidCalendarEvent, BiSolidPackage } from "react-icons/bi";
import { IoIosGift } from "react-icons/io";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-none py-4">
      {/* single item */}
      <div className="hidden lg:flex items-center p-3">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <MdDashboard size={28} color="#0000CD" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 1 ? "text-[red]" : "text-black"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/admin/orders" className="w-full flex items-center">
          <HiMiniShoppingBag size={28} color="009900" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 2 ? "text-[red]" : "text-black"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3 ">
        <Link to="/admin/sellers" className="w-full flex items-center">
          <GiSellCard size={28} color="green" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 3 ? "text-[red]" : "text-black"
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/admin/users" className="w-full flex items-center">
          <HiUserGroup size={28} color="purple" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 4 ? "text-[red]" : "text-black"
            }`}
          >
            All User
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/admin/products" className="w-full flex items-center">
          <BiSolidPackage size={28} color="#88be19" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 5 ? "text-[red]" : "text-black"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/admin/events" className="w-full flex items-center">
          <BiSolidCalendarEvent size={26} color="#5f2872" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 6 ? "text-[red]" : "text-black"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/admin/coupons" className="w-full flex items-center">
          <IoIosGift size={28} color="ff00cc" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 7 ? "text-[red]" : "text-black"
            }`}
          >
            All Coupons
          </h5>
        </Link>
      </div>
      <div className="hidden lg:flex items-center p-3 lg:p-3 mb-2">
        <Link to="/admin/withdraw-request" className="w-full flex items-center">
          <GiMoneyStack size={30} color="006600" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 8 ? "text-[red]" : "text-black"
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>

      {/* Mobile view */}
      <div className="flex lg:hidden py-3 mb-4">
        <Link
          to="/admin/dashboard"
          className="w-full flex flex-col items-center"
        >
          <MdDashboard size={30} color="#0000CD" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 1 ? "text-[red]" : "text-black"
            }`}
          >
            Dashboard
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 mb-4">
        <Link to="/admin/orders" className="w-full flex flex-col items-center">
          <HiMiniShoppingBag size={30} color="009900" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 2 ? "text-[red]" : "text-black"
            }`}
          >
            All Orders
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 mb-4">
        <Link to="/admin/sellers" className="w-full flex flex-col items-center">
          <GiSellCard size={30} color="green" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 3 ? "text-[red]" : "text-black"
            }`}
          >
            All Sellers
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 mb-4">
        <Link to="/admin/users" className="w-full flex flex-col items-center">
          <HiUserGroup size={30} color="purple" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 4 ? "text-[red]" : "text-black"
            }`}
          >
            All Users
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 mb-4">
        <Link
          to="/admin/products"
          className="w-full flex flex-col items-center"
        >
          <BiSolidPackage size={30} color="#2c8f00" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 5 ? "text-[red]" : "text-black"
            }`}
          >
            Products
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 mb-4">
        <Link to="/admin/events" className="w-full flex flex-col items-center">
          <BiSolidCalendarEvent size={28} color="#5f2872" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 6 ? "text-[red]" : "text-black"
            }`}
          >
            Events
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 mb-4">
        <Link to="/admin/coupons" className="w-full flex flex-col items-center">
          <IoIosGift size={30} color="ff00cc" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 7 ? "text-[red]" : "text-black"
            }`}
          >
            Coupons
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 mb-4">
        <Link
          to="/admin/withdraw-request"
          className="w-full flex flex-col items-center"
        >
          <GiMoneyStack size={32} color="006600" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 8 ? "text-[red]" : "text-black"
            }`}
          >
            Withdraws
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
