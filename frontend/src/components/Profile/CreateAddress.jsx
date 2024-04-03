import React, { useState } from "react";
import { updateUserAddress } from "../../features/user/userSlice";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import SmallLoader from "../Layout/SmallLoader";

const CreateAddress = ({ setOpen }) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
      <div className="w-[90%] lg:w-[40%] h-[80vh] md:h-[80vh] overflow-y-scroll scrollbar-none lg:h-[75vh] bg-gradient-to-r from-slate-300 to-slate-400 ... rounded-md shadow-2xl relative p-1 lg:p-2 mt-4">
        <div className="w-full flex items-center justify-between pb-3 px-2">
          <h5 className=" text-base md:text-lg lg:text-xl font-semibold text-center">
            Add new address
          </h5>
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="h-[70vh] overflow-y-scroll scrollbar-none pb-6 pt-1">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full block p-4">
              <div className="w-full pb-2">
                <label className="block pb-2 font-semibold"> Country </label>
                <select
                  name=""
                  id=""
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-lime-500 h-[40px] rounded-[5px]"
                >
                  <option value="" className=" block text-[12px] md:text-sm">
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
                  <option value="" className=" block text-[12px] md:text-sm">
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
                <label className="block pb-2 font-semibold">Address 1</label>
                <input
                  type="address"
                  className={`${styles.input} !border-lime-500`}
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>
              <div className="w-full pb-2">
                <label className="block pb-2 font-semibold">Address 2</label>
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
                <label className="block pb-2 font-semibold">Address Type</label>
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
  );
};

export default CreateAddress;
