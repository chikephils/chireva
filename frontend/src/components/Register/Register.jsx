import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Logo from "../../Assests/img/logo.png";
import SmallLoader from "../Layout/SmallLoader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);

    axios
      .post(`${server}/user/create-user`, {
        firstName,
        lastName,
        email,
        password,
        avatar,
      })
      .then((res) => {
        toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setAvatar();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="relative flex-col pb-10">
        <div className=" flex items-center justify-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-14 h-14" />
          </Link>
        </div>

        <div className="mx-auto mt-2 max-w-[380px]">
          <div className=" shadow py-4 px-5 ">
            <form className="space-y-2" onSubmit={handleSubmit}>
              <h1 className=" pb-4 text-base md:text-lg lg:text-xl font-semibold text-center">
                Register as a new User
              </h1>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-[14px] md:text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-[45px] appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[16px] md:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-[14px] md:text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className=" h-[45px] appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[16px] md:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[14px] md:text-sm font-medium text-gray-700"
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
                    className="h-[45px] appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[16px] md:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-[14px] md:text-sm font-medium text-gray-700"
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
                    className="h-[45px] appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[16px] md:text-sm"
                  />
                  {visible ? (
                    <AiOutlineEye
                      className=" absolute right-2 top-3 cursor-pointer"
                      size={22}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className=" absolute right-2 top-3 cursor-pointer"
                      size={22}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className=" block text-sm font-medium text-gray-700"
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
                    className=" h-[40px] ml-5 flex items-center justify-center px-4 py-1 border border-gray-300 rounded-md shadow-md text-[14px] md:text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 cursor-pointer"
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
                  className="group relative w-full h-[45px] md:h-[40px] flex items-center justify-center py-1 px-4 border border-transparent text-[16px] md:text-sm font-medium rounded-md text-black bg-lime-400 hover:bg-lime-500"
                >
                  {isLoading ? <SmallLoader /> : "Register"}
                </button>
              </div>
              <div
                className={`${styles.normalFlex} gap-4 w-full text-[14px] md:text-sm`}
              >
                <h5>Already have an Account ?</h5>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 pl-2 text-[14px] md:text-sm "
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

export default Register;
