import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadSeller,
  selectSeller,
  selectSellerLoading,
} from "../../features/shop/shopSlice";
import { server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import SmallLoader from "../Layout/SmallLoader";
import axios from "axios";
import { toast } from "react-toastify";
import CreateLoader from "../Layout/createLoader";

const Settings = () => {
  const seller = useSelector(selectSeller);
  const [avatar, setAvatar] = useState();
  const [shopName, setShopName] = useState(
    seller && seller.ShopName ? seller.shopName : ""
  );
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const sellerLoading = useSelector(selectSellerLoading);
  const sellerToken = useSelector((state) => state.shop.sellerToken);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const reader = new FileReader();
    setLoading(true);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);

        axios
          .put(
            `${server}/shop/update-shop-avatar"`,
            { avatar: reader.result },
            {
              headers: {
                Authorization: `Bearer ${sellerToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            dispatch(LoadSeller());
            toast.success("Avatar updated successfully");
          })
          .catch((error) => {
            toast.error(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else return;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          shopName,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(LoadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    setIsLoading(false);
  };

  return (
    <div className=" h-full w-full items-center justify-center">
      <>
        {loading || sellerLoading ? (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50 z-10 flex items-center justify-center">
            <CreateLoader />
          </div>
        ) : null}
      </>

      <div className="flex items-center justify-center sticky h-[35px] bg-slate-200 py-2">
        <h5 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black py-2">
          Shop Settings
        </h5>
      </div>
      <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-8">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={`${seller?.avatar?.url}`}
              alt=""
              className="w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-full cursor-pointer border-[1.5px] border-lime-500 "
            />
            <div className="w-[30px] h-[30px] bg-slate-400 rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* Shop info */}
        <form className="flex flex-col items-center" onSubmit={updateHandler}>
          <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[70%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2"> Shop Name</label>
            </div>
            <input
              type="name"
              placeholder={`${seller?.shopName}`}
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[70%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <textarea
              type="text"
              name="description"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              rows={4}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[70%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[70%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 600px:w-[80%] 800px:w-[70%] mt-2">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 600px:w-[50%] 800px:w-[50%] mt-4">
            <button
              type="submit"
              className="w-[95%] bg-black h-[45px] rounded-md text-white cursor-pointer mb-4 800px:mb-4 600px:mb-4"
            >
              {isLoading ? <SmallLoader /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
