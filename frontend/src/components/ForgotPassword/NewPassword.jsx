import React, { useState } from "react";
import { Link } from "react-router-dom";
import SmallLoader from "../Layout/SmallLoader";
import styles from "../../styles/styles";
import Logo from "../../Assests/img/logo.png";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setloader] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {};

  return (
    <div className="relative flex-col pb-5">
      <div className=" flex items-center justify-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-14 h-14" />
        </Link>
      </div>
      <div className="mt-2 mx-auto max-w-md">
        <div className=" py-2 md:py-4 px-4 shadow">
          <form className="space-y-2" onSubmit={handleSubmit}>
            <h1 className=" pb-2 md:pb-4 text-base md:text-lg lg:text-xl font-semibold text-center">
              Create new password
            </h1>

            <div>
              <label
                htmlFor="password"
                className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 text-[14px] md:text-[16px]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 text-[14px] md:text-[16px]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[35px] md:h-[40px] flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-lime-500 hover:bg-lime-600"
                // disabled={loading}
              >
                {loader ? <SmallLoader /> : "Login"}
              </button>
            </div>
            <div
              className={`${styles.normalFlex} w-full text-[14px] md:text-[16px]`}
            >
              <h5>Don't have an Account ?</h5>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 pl-2 text-[14px] md:text-[16px] "
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
