import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import SmallLoader from "../Layout/SmallLoader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";
import Logo from "../../Assests/img/logo.png";

const ShopPasswordReset = () => {
  const { reset_token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setloader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    setloader(true);
    const validateResetToken = async () => {
      try {
        const response = await axios.post(`${server}/shop/verify-token-shop`, {
          resetToken: reset_token,
        });
        console.log(response.data);
        if (response.data.success === true) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error("Error validating reset token:", error);
        setTokenValid(false);
      } finally {
        setloader(false);
      }
    };

    if (reset_token) {
      validateResetToken();
    }
  }, [reset_token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${server}/user/new-password/${id}`, {
        password,
        confirmPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative flex-col pb-5">
      <div className=" flex items-center justify-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-14 h-14" />
        </Link>
      </div>
      {loader ? (
        <div className="flex items-center justify-center  h-[60vh] ">
          <Loader />
        </div>
      ) : tokenValid ? (
        <div className="mt-2 mx-auto max-w-md">
          <div className=" py-2 md:py-4 px-4 shadow">
            <form className="space-y-2" onSubmit={handleSubmit}>
              <h1 className=" pb-2 md:pb-4 text-base md:text-lg 800px:text-xl font-semibold text-center">
                Create new shop password
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
                <button
                  type="submit"
                  className="group relative w-full h-[35px] md:h-[40px] flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-lime-500 hover:bg-lime-600"
                >
                  {loading ? <SmallLoader /> : "Change Password"}
                </button>
              </div>
              <div
                className={`${styles.normalFlex} w-full text-[14px] md:text-[16px]`}
              >
                <h5>Login into your Account ?</h5>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 pl-2 text-[14px] md:text-[16px] "
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-md mt-4 shadow py-4 md:py-6 px-4 rounded-md">
          <div className="text-red-500 font-medium mt-4 flex items-center justify-center text-center ">
            <p>
              The password reset link has expired. Please request a new one.
            </p>
          </div>
          <div className="flex items-center justify-center text-center mt-4">
            <Link
              to="/shop-forgot-password"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Request a new password reset link
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPasswordReset;
