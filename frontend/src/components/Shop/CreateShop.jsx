import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Logo from "../../Assests/img/logo.png";

const CreateShop = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      } else return;
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios
      .post(`${server}/shop/create-shop`, {
        shopName,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);
        setShopName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode("");
        setAddress("");
        setPhoneNumber("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <div className=" relative flex-col pb-8">
        <div className="flex items-center justify-center  py-2 sticky top-2 mb-2">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-14 h-14" />
          </Link>
        </div>

        <div className=" mx-auto mt-2 max-w-[380px] mb-5">
          <div className=" shadow py-4 px-5">
            <form className="space-y-1" onSubmit={handleSubmit}>
              <h1 className=" pb-4 text-[16px] md:text-lg lg:text-xl font-semibold text-center">
                Register as a Seller
              </h1>
              <div>
                <label
                  htmlFor="shopName"
                  className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
                >
                  Shop Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="shopName"
                    id="shopName"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className=" h-[40px] appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-400 text-[14px] md:text-[16px]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phoneNumber"
                    id="phoneNumber"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-[40px] appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-400 text-[14px] md:text-[16px]"
                  />
                </div>
              </div>
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
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-[40px] appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-400 text-[14px] md:text-[16px]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
                >
                  Address:
                </label>
                <div className="mt-1">
                  <input
                    type="address"
                    id="address"
                    name="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-[40px] appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-400 text-[14px] md:text-[16px]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-[14px] md:text-[16px] font-semibold text-gray-700"
                >
                  Zip Code:
                </label>
                <div className="mt-1">
                  <input
                    type="zipCode"
                    id="zipCode"
                    name="zipCode"
                    autoComplete="zipCode"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="h-[40px] appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-400 text-[14px] md:text-[16px]"
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
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-[40px] appearance-none block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-400 text-[14px] md:text-[16px]"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className=" absolute right-2 top-1 cursor-pointer"
                      size={22}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className=" absolute right-2 top-1 cursor-pointer"
                      size={22}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div className="pb-1">
                <label
                  htmlFor="avatar"
                  className=" block text-[14px] md:text-[16px] font-semibold text-gray-700"
                ></label>
                <div className="mt-2 flex items-center">
                  <span className=" inline-block h-10 w-10 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-10 w-10" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className=" ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-[14px] md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
                  >
                    <span>Upload Image</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleAvatarChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full  h-[45px] flex items-center justify-center py-2 px-4 border border-transparent text-[16px] font-medium rounded-md text-black bg-lime-500 hover:bg-lime-600"
                >
                  {isSubmitting ? "Please wait..." : "Register"}
                </button>
              </div>
              <div
                className={`${styles.normalFlex} w-full text-[14px] md:text-[16px] font-semibold`}
              >
                <h5>Already have an Account ?</h5>
                <Link
                  to="/shop-login"
                  className="text-blue-600 hover:text-blue-800 pl-2 text-[14px] md:text-[16px] font-semibold "
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
