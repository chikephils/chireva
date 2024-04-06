import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import {
  FcAddressBook,
  FcInTransit,
  FcPaid,
  FcPortraitMode,
  FcPrivacy,
} from "react-icons/fc";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  RiLogoutCircleLine,
  RiMessageFill,
  RiRefundFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { setLogout } from "../../features/user/userSlice";

const ProfileSideBar = ({ active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        dispatch(setLogout());
        toast.success(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full h-full overflow-y-scroll scrollbar-none py-2">
      <div className="hidden 800px:flex items-center p-2 md:p-3">
        <Link to="/profile" className="w-full flex items-center">
          <FcPortraitMode
            size={30}
            color={`${active === 1 ? "red" : "black"}`}
          />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 1 ? "text-[red]" : "text-black"
            }`}
          >
            Profile
          </h5>
        </Link>
      </div>

      <div className="hidden 800px:flex items-center p-2 md:p-3">
        <Link to="/profile/orders" className="w-full flex items-center">
          <FcPaid size={28} color={`${active === 2 ? "red" : "black"}`} />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 2 ? "text-[red]" : "text-black"
            }`}
          >
            Orders
          </h5>
        </Link>
      </div>
      <div className="hidden 800px:flex items-center p-2 md:p-3">
        <Link to="/profile/refunds" className="w-full flex items-center">
          <RiRefundFill size={28} color="#9370DB" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 3 ? "text-[red]" : "text-black"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="hidden 800px:flex items-center p-2 md:p-3">
        <Link to="/profile/inbox" className="w-full flex items-center">
          <RiMessageFill size={28} color="green" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 4 ? "text-[red]" : "text-black"
            }`}
          >
            Inbox
          </h5>
        </Link>
      </div>
      <div className="hidden 800px:flex items-center p-2 md:p-3">
        <Link to="/profile/track-orders" className="w-full flex items-center">
          <FcInTransit size={28} color={`${active === 5 ? "red" : "black"}`} />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 5 ? "text-[red]" : "text-black"
            }`}
          >
            Track Orders
          </h5>
        </Link>
      </div>
      <div className="hidden 800px:flex items-center p-2 md:p-3">
        <Link
          to="/profile/change-password"
          className="w-full flex items-center"
        >
          <FcPrivacy size={30} color={`${active === 6 ? "red" : "black"}`} />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 6 ? "text-[red]" : "text-black"
            }`}
          >
            Change Password
          </h5>
        </Link>
      </div>
      <div className="hidden 800px:flex items-center p-2 md:p-3">
        <Link to="/profile/address" className="w-full flex items-center">
          <FcAddressBook
            size={28}
            color={`${active === 7 ? "red" : "black"}`}
          />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 7 ? "text-[red]" : "text-black"
            }`}
          >
            Address Book
          </h5>
        </Link>
      </div>
      <div className="hidden 800px:flex items-center p-2 md:p-3 cursor-pointer">
        <div
          onClick={handleLogout}
          className="flex items-center justify-center"
        >
          <RiLogoutCircleLine size={28} color="red" />
          <h5
            className={`block pl-2 text-[16px] font-semibold ${
              active === 8 ? "text-[red]" : "text-black"
            }`}
          >
            Logout
          </h5>
        </div>
      </div>

      {user && user?.role === "Admin" && (
        <div className="hidden 800px:flex items-center p-2 md:p-3">
          <Link to="/admin/dashboard" className="w-full flex items-center">
            <MdAdminPanelSettings size={28} color="green" />
            <h5
              className={`block pl-2 text-[16px] font-semibold ${
                active === 9 ? "text-[red]" : "text-black"
              }`}
            >
              Admin Dashboard
            </h5>
          </Link>
        </div>
      )}

      {/* mobile view */}
      <div className="block 800px:hidden w-full pb-4">
        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <Link to="/profile">
            <div className="flex items-center justify-center">
              <FcPortraitMode
                size={32}
                className="flex items-center justify-center"
                color={`${active === 1 ? "red" : "black"}`}
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 1 ? "text-[red]" : "text-black"
              }`}
            >
              Profile
            </h5>
          </Link>
        </div>

        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <Link to="/profile/orders">
            <div className="flex items-center justify-center">
              <FcPaid
                size={30}
                className="flex items-center justify-center"
                color="green"
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 2 ? "text-[red]" : "text-black"
              }`}
            >
              Orders
            </h5>
          </Link>
        </div>

        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <Link to="/profile/refunds">
            <div className="flex items-center justify-center">
              <RiRefundFill
                size={28}
                className="flex items-center justify-center"
                color="#9370DB"
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 3 ? "text-[red]" : "text-black"
              }`}
            >
              Refunds
            </h5>
          </Link>
        </div>

        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <Link to="/profile/inbox">
            <div className="flex items-center justify-center">
              <RiMessageFill
                size={30}
                className="flex items-center justify-center"
                color="green"
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 4 ? "text-[red]" : "text-black"
              }`}
            >
              Inbox
            </h5>
          </Link>
        </div>

        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <Link to="/profile/track-orders">
            <div className="flex items-center justify-center">
              <FcInTransit
                size={28}
                className="flex items-center justify-center"
                color={`${active === 5 ? "red" : "black"}`}
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 5 ? "text-[red]" : "text-black"
              }`}
            >
              Track Orders
            </h5>
          </Link>
        </div>

        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <Link to="/profile/change-password">
            <div className="flex items-center justify-center">
              <FcPrivacy
                size={30}
                className="flex items-center justify-center"
                color={`${active === 6 ? "red" : "black"}`}
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 6 ? "text-[red]" : "text-black"
              }`}
            >
              Change password
            </h5>
          </Link>
        </div>

        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <Link to="/profile/address">
            <div className="flex items-center justify-center">
              <FcAddressBook
                size={30}
                className="flex items-center justify-center"
                color={`${active === 7 ? "red" : "black"}`}
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 7 ? "text-[red]" : "text-black"
              }`}
            >
              Address
            </h5>
          </Link>
        </div>

        <div className="flex-col items-center justify-center cursor-pointer w-full mb-8">
          <div onClick={handleLogout}>
            <div className="flex items-center justify-center">
              <RiLogoutCircleLine
                size={28}
                className="flex items-center justify-center"
                color="red"
              />
            </div>

            <h5
              className={`block text-[12px] font-medium text-center ${
                active === 8 ? "text-[red]" : "text-black"
              }`}
            >
              Logout
            </h5>
          </div>
        </div>

        {user && user?.role === "Admin" && (
          <div className="flex-col items-center justify-center cursor-pointer w-full">
            <Link to="/admin/dashboard">
              <div className="flex items-center justify-center">
                <MdAdminPanelSettings
                  size={32}
                  className="flex items-center justify-center"
                  color="green"
                />
              </div>

              <h5
                className={`block text-[12px] font-medium text-center ${
                  active === 9 ? "text-[red]" : "text-black"
                }`}
              >
                Admin
              </h5>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSideBar;
