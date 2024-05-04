import React, { useState } from "react";
import SmallLoader from "../Layout/SmallLoader";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import Logo from "../../Assests/img/logo.png";

const ShopForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loader, setloader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true);

    axios
      .post(`${server}/shop/forgot-shop-password`, {
        email,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setloader(false);
      });
  };

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
            <h1 className=" pb-2 md:pb-4 text-base md:text-lg 800px:text-xl font-semibold text-center">
              Recover Shop Account Password
            </h1>
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
              >
                Email address:
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 text-[14px] md:text-[16px]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[35px] md:h-[40px] flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-lime-500 hover:bg-lime-600"
              >
                {loader ? <SmallLoader /> : "Recover Password"}
              </button>
            </div>
            <div
              className={`${styles.normalFlex} w-full text-[14px] md:text-[16px]`}
            >
              <h5>Don't have an Account ?</h5>
              <Link
                to="/create-shop"
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

export default ShopForgotPassword;
