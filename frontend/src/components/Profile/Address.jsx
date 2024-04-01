import React, { useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import SmallLoader from "../Layout/SmallLoader";
import { Country, State } from "country-state-city";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  updateUserAddress,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Office",
    },
    {
      name: "Home",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("Please Fill out all Fields");
    } else {
      setLoading(true);
      try {
        await dispatch(
          updateUserAddress({
            country,
            city,
            address1,
            address2,
            zipCode,
            addressType,
          })
        );
        setOpen(false);
        setCountry("");
        setCity("");
        setAddress1("");
        setAddress2("");
        setZipCode("");
        setAddressType("");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <>
      {open && (
        <div className="fixed w-full h-screen top-10 lg:top-6 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
          <div className="w-[90%] lg:w-[40%] h-[80vh] md:h-[80vh] overflow-y-scroll scrollbar-none lg:h-[75vh] bg-gradient-to-r from-slate-300 to-slate-400 ... rounded-md shadow-2xl z-[1000] p-1 lg:p-2 mt-4">
            <div className="w-full flex justify-end p-1">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />{" "}
            </div>
            <h1 className="text-center text-[16px] md:text-[20px] lg:text-[25px] font-poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2 font-semibold">
                      {" "}
                      Country{" "}
                    </label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-lime-500 h-[40px] rounded-[5px]"
                    >
                      <option
                        value=""
                        className=" block text-[12px] md:text-sm"
                      >
                        Choose your Country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="text-[14px] md:text-[16px] lg:text-base font-medium "
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2 font-semibold">State</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-lime-500 h-[40px] rounded-[5px]"
                    >
                      <option
                        value=""
                        className=" block text-[12px] md:text-sm"
                      >
                        Choose your State
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="text-[14px] md:text-[16px] lg:text-base font-medium"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2 font-semibold">
                      Address 1
                    </label>
                    <input
                      type="address"
                      className={`${styles.input} !border-lime-500`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2 font-semibold">
                      Address 2
                    </label>
                    <input
                      type="address"
                      className={`${styles.input} !border-lime-500`}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2 font-semibold">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input} !border-lime-500`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2 font-semibold">
                      Address Type
                    </label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px] border-lime-500"
                    >
                      <option
                        value=""
                        className="text-[14px] md:text-[16px] lg:text-[16px] font-medium"
                      >
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="text-[14px] md:text-[16px] lg:text-base font-medium"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className=" w-full pb-2 flex items-center justify-center">
                    <button
                      type="submit"
                      className={`${styles.input} !w-[50%] !h-[45px] font-semibold !border-lime-500 mt-5 cursor-pointer bg-gradient-to-r from-lime-400 to-lime-400 ... items-center justify-center`}
                    >
                      {loading ? <SmallLoader /> : "Add"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="sticky top-2 mb-2 flex items-center justify-between">
        <h1 className="text-sm font-medium lg:text-[25px] lg:font-[600] text-black ">
          My Address
        </h1>
        <div
          className={`${styles.sm_button} rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-white text-sm lg:text-base"> Add New</span>
        </div>
      </div>
      <br />
      {user && user.addresses.length > 0 ? (
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-gradient-to-r from-slate-50 to-slate-100 ... h-[70px] 800px:h-[70px] rounded-[4px] flex items-center justify-between px-1 gap-2  mb-5"
            key={index}
          >
            <h5 className="text-[12px] 400px:text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
              {item.addressType}
            </h5>

            <h6 className="text-[12px] 400px:text-[14px]  md:text-[14px] lg:text-[18px]">
              {item.address1} {item.address2}
            </h6>

            <h6 className="hidden md:flex lg:flex text-[12px]  md:text-[14px] lg:text-[18px]">
              {user && user.phoneNumber}
            </h6>

            <AiOutlineDelete
              size={25}
              className="cursor-pointer "
              onClick={() => handleDelete(item)}
            />
          </div>
        ))
      ) : (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </>
  );
};

export default Address;
