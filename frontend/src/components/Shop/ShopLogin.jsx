import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import { setShopLogin } from "../../features/shop/shopSlice";
import { useDispatch } from "react-redux";
import Logo from "../../Assests/img/logo.png";
import SmallLoader from "../Layout/SmallLoader";
import { shopTokenExpires } from "../../utils/auth";

const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${server}/shop/shop-login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        const { sellerToken, seller, message } = response.data;
        dispatch(setShopLogin({ seller, sellerToken }));
        toast.success(message);
        navigate("/dashboard");
        shopTokenExpires(dispatch);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex-col pb-5">
      <div className=" flex items-center justify-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-14 h-14" />
        </Link>
      </div>
      <div className="mt-2 mx-auto max-w-md">
        <div className=" py-4 px-4 shadow">
          <form className="space-y-2" onSubmit={handleSubmit}>
            <h1 className=" pb-4 text-base md:text-lg lg:text-xl font-semibold text-center">
              Login in your Shop
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
              <label
                htmlFor="password"
                className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
              >
                Password
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
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  className="h-4 w-4 text-lime-600 focus:ring-lime-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-[14px] md:text-[16px] text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-[14px] md:text-[16px]">
                <Link
                  to="/shop-forgot-password"
                  className="font-medium text-blue-500 hover:text-blue-800"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full items-center cursor-pointer h-[45px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-lime-500 hover:bg-lime-600"
              >
                {isLoading ? <SmallLoader /> : "Login"}
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
                {" "}
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
