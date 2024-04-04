import React from "react";
import { Link } from "react-router-dom";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { RiCalendarEventFill } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import {
  FcSms,
  FcMoneyTransfer,
  FcAutomatic,
  FcRefresh,
  FcOrganization,
  FcPackage,
  FcPaid,
} from "react-icons/fc";
import { FiGift } from "react-icons/fi";

const DashBoardSideBar = ({ active }) => {
  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-none py-4">
      {/* single Items desktop view */}
      <div className="hidden lg:flex items-center p-3">
        <Link to="/dashboard" className="w-full flex items-center">
          <FcOrganization
            size={30}
            color={`${active === 1 ? "red" : "black"}`}
          />
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
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FcPaid size={30} color={`${active === 2 ? "red" : "black"}`} />
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
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FcPackage size={30} color={`${active === 3 ? "red" : "black"}`} />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 3 ? "text-[red]" : "text-black"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <MdCreateNewFolder size={30} color="green" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 4 ? "text-[red]" : "text-black"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <RiCalendarEventFill size={28} color="green" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 5 ? "text-[red]" : "text-black"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <MdLibraryAdd size={28} color="green" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 6 ? "text-[red]" : "text-black"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3 lg:p-3">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <FaMoneyBill1Wave size={28} color="green" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 7 ? "text-[red]" : "text-black"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>

      <div className=" hidden lg:flex items-center p-3 lg:p-3">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <FcSms size={30} color={`${active === 8 ? "red" : "black"}`} />
          <h5
            className={`hidden lg:block pl-2 text-[14px] lg:text-[16px] font-semibold ${
              active === 8 ? "text-[red]" : "text-black"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3">
        <Link to="/dashboard/coupons" className="w-full flex items-center">
          <FiGift size={30} color="green" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 9 ? "text-[red]" : "text-black"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3 ">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <FcRefresh size={30} color={`${active === 10 ? "red" : "black"}`} />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 10 ? "text-[red]" : "text-black"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="hidden lg:flex items-center p-3 ">
        <Link to="/dashboard-transactions" className="w-full flex items-center">
          <FcMoneyTransfer
            size={30}
            color={`${active === 11 ? "red" : "black"}`}
          />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 11 ? "text-[red]" : "text-black"
            }`}
          >
            Transactions
          </h5>
        </Link>
      </div>

      <div className="hidden lg:flex items-center p-3 pb-6 mb-2">
        <Link to="/dashboard-settings" className="w-full flex items-center">
          <FcAutomatic size={30} color={`${active === 12 ? "red" : "black"}`} />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 12 ? "text-[red]" : "text-black"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>

      {/* Mobile view */}
      <div className="flex lg:hidden py-3">
        <Link to="/dashboard" className="w-full flex flex-col items-center">
          <FcOrganization
            size={32}
            color={`${active === 1 ? "red" : "black"}`}
          />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 1 ? "text-[red]" : "text-black"
            }`}
          >
            Dashboard
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-orders"
          className="w-full flex flex-col items-center"
        >
          <FcPaid size={32} color={`${active === 2 ? "red" : "black"}`} />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 2 ? "text-[red]" : "text-black"
            }`}
          >
            All Orders
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-products"
          className="w-full flex flex-col items-center"
        >
          <FcPackage size={32} color={`${active === 3 ? "red" : "black"}`} />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 3 ? "text-[red]" : "text-black"
            }`}
          >
            Products
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-create-product"
          className="w-full flex flex-col items-center"
        >
          <MdCreateNewFolder size={32} color="green" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 4 ? "text-[red]" : "text-black"
            }`}
          >
            Create..
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-events"
          className="w-full flex flex-col items-center"
        >
          <RiCalendarEventFill size={30} color="green" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 5 ? "text-[red]" : "text-black"
            }`}
          >
            All Events
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-create-event"
          className="w-full flex flex-col items-center"
        >
          <MdLibraryAdd size={28} color="green" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 6 ? "text-[red]" : "text-black"
            }`}
          >
            Add Event
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex flex-col items-center"
        >
          <FaMoneyBill1Wave size={30} color="green" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 7 ? "text-[red]" : "text-black"
            }`}
          >
            Withdraw
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-messages"
          className="w-full flex flex-col items-center"
        >
          <FcSms size={30} color={`${active === 8 ? "red" : "black"}`} />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 8 ? "text-[red]" : "text-black"
            }`}
          >
            Messages
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard/coupons"
          className="w-full flex flex-col items-center"
        >
          <FiGift size={30} color="green" />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 9 ? "text-[red]" : "text-black"
            }`}
          >
            Discounts
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-refunds"
          className="w-full flex flex-col items-center"
        >
          <FcRefresh size={30} color={`${active === 10 ? "red" : "black"}`} />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 10 ? "text-[red]" : "text-black"
            }`}
          >
            Refunds
          </p>
        </Link>
      </div>
      <div className="flex lg:hidden py-3">
        <Link
          to="/dashboard-transactions"
          className="w-full flex flex-col items-center"
        >
          <FcMoneyTransfer
            size={32}
            color={`${active === 11 ? "red" : "black"}`}
          />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 11 ? "text-[red]" : "text-black"
            }`}
          >
            Transactions
          </p>
        </Link>
      </div>

      <div className="flex lg:hidden py-3 pb-6 mb-2">
        <Link
          to="/dashboard-settings"
          className="w-full flex flex-col items-center"
        >
          <FcAutomatic size={32} color={`${active === 12 ? "red" : "black"}`} />
          <p
            className={`text-[12px] md:text-[16px] font-medium ${
              active === 12 ? "text-[red]" : "text-black"
            }`}
          >
            Settings
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
