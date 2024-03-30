import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadUser,
  selectUserLoading,
  updateUserInformation,
} from "../../features/user/userSlice";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { FcPortraitMode } from "react-icons/fc";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import CreateLoader from "../Layout/createLoader";

const ProfileContent = () => {
  const user = useSelector((state) => state.user?.user);
  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.lastName);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const userLoading = useSelector(selectUserLoading);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        updateUserInformation({
          firstName,
          email,
          lastName,
          phoneNumber,
          password,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    setIsLoading(true);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);

        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then((response) => {
            dispatch(LoadUser());
            toast.success("Avatar updated successfully");
          })
          .catch((error) => {
            toast.error(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else return
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="">
      <>
        {isLoading || userLoading ? (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50 z-10 flex items-center justify-center">
            <CreateLoader />
          </div>
        ) : null}
      </>
      <div className="flex items-center justify-center  py-2 sticky top-2 mb-2">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <FcPortraitMode size={24} /> My Profile
        </h1>
      </div>
      {/* Profile Page */}
      <div className=" h-[70vh] overflow-y-scroll scrollbar-none pt-2 pb-3">
        <div className="flex justify-center w-full pr-4 mt-2">
          <div className="relative">
            <img
              src={`${user?.avatar?.url}`}
              className=" w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] rounded-full object-cover border-[3px] border-lime-500"
              alt="avatar"
            />
            <div className="w-[30px] h-[30px] bg-slate-300 rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <AiOutlineCamera className="cursor-pointer" />
              </label>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full px-2 md:px-5">
          <form onSubmit={handleSubmit}>
            <div className="w-full block lg:flex pb-1 lg:pb-3">
              <div className="w-[100%] lg:w-[50%]">
                <label className="block pb-1 text-sm lg:text-base font-medium">
                  {" "}
                  First Name
                </label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 lg:mb-0`}
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-[100%] lg:w-[50%]">
                <label className="block pb-1 text-sm lg:text-base font-medium">
                  {" "}
                  Last Name
                </label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 lg:mb-0`}
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:flex block pb-1 lg:pb-3">
              <div className="w-[100%] lg:w-[50%]">
                <label className="block pb-1 text-sm lg:text-base font-medium">
                  {" "}
                  Email Address{" "}
                </label>
                <input
                  type="text"
                  className={`${styles.input} !w-[95%] mb-4 lg:mb-0`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-[100%] lg:w-[50%]">
                <label className="block pb-1 text-sm lg:text-base font-medium">
                  {" "}
                  Phone Number
                </label>
                <input
                  type="number"
                  className={`${styles.input} !w-[95%] mb-4 lg:mb-0`}
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full lg:flex block pb-1 lg:pb-3">
              <div className="w-[100%] lg:w-[50%]">
                <label className="block pb-1 text-sm lg:text-base font-medium">
                  {" "}
                  Password
                </label>
                <input
                  type="password"
                  className={`${styles.input} !w-[95%] mb-4 lg:mb-0`}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <input
              className="w-[125px] h-[40px] border border-lime-700 text-center text-lime-600 font-bold rounded-[3px] mt-6 cursor-pointer"
              required
              value={loading ? "Updating..." : "Update"}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
