import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SmallLoader from "../Layout/SmallLoader";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.user.token);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await axios.put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
      setLoader(false);
    }
  };

  return (
    <div className=" px-1">
      <div className="w-full md:w-[60%]">
        <div className="flex items-center justify-center sticky h-[35px]">
          <h1 className=" flex font-medium 800px:text-[25px] 800px:font-[600] text-black py-2">
            Change Password
          </h1>
        </div>

        <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-6">
          <form className="space-y-2" onSubmit={passwordChangeHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
              >
                Enter your old password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  name="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 text-[14px] md:text-[16px]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
              >
                Enter your new Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 text-[14px] md:text-[16px]"
                />
                {visible ? (
                  <AiOutlineEye
                    className=" absolute right-2 top-2 cursor-pointer"
                    size={23}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className=" absolute right-2 top-2 cursor-pointer"
                    size={23}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
              >
                Confrim your new Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 text-[14px] md:text-[16px]"
                />
                {visible ? (
                  <AiOutlineEye
                    className=" absolute right-2 top-2 cursor-pointer"
                    size={23}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className=" absolute right-2 top-2 cursor-pointer"
                    size={23}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className={`w-[50%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer bg-gradient-to-r from-blue-200 to-blue-400 ...`}
                type="submit"
              >
                {" "}
                {loader ? <SmallLoader /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
