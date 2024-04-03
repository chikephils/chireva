import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import SmallLoader from "../Layout/SmallLoader";

const CreateCoupon = ({ seller, setIsOpen, refreshCoupons, shopProducts }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!value) {
      errors.value = "Value is required";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }
    setShowLoader(true);

    try {
      await axios.post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProduct,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      );
      setShowLoader(false);
      toast.success("Coupon created successfully");
      refreshCoupons();
      setIsOpen(false);
    } catch (error) {
      setShowLoader(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-50 flex items-center justify-center pt-10 lg:pl-24 lg:pt-16">
      <div className="w-[90%] lg:w-[40%] h-[80vh] bg-gradient-to-l from-slate-200 to-slate-300 ... rounded-md shadow p-4 z-50">
        <div className="w-full flex items-center justify-between pb-3 px-2">
          <h5 className=" text-base md:text-lg lg:text-xl font-semibold text-center">
            Create Coupon
          </h5>
          <RxCross2
            size={30}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="h-[70vh] overflow-y-scroll scrollbar-none pb-6 pt-1">
          <form onSubmit={handleSubmit}>
            <div>
              <label className=" block text-[14px] md:text-[16px] font-medium ">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter coupon name..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-sm"
              />
            </div>
            <br />
            <div>
              <label className=" block text-[14px] md:text-[16px] font-medium ">
                Discount Percentage <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="value"
                value={value}
                required
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter coupon code value..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-sm"
              />
            </div>
            <br />
            <div>
              <label className=" block text-[14px] md:text-[16px] font-medium ">
                Minimum Amount
              </label>
              <input
                type="number"
                name="minAmount"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Enter coupon code min Amount..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-sm"
              />
            </div>
            <br />
            <div>
              <label className=" block text-[14px] md:text-[16px] font-medium ">
                Maximum Amount
              </label>
              <input
                type="number"
                name="maxAmount"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                placeholder="Enter coupon code Max Amount..."
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-sm"
              />
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Selected Product
              </label>
              <select
                className="w-full mt-2 border h-[45px] rounded-[5px]"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option
                  className="text-[12px] md:text-[16px]"
                  value="Choose your Selected Product"
                >
                  Choose your selected Product
                </option>
                {shopProducts &&
                  shopProducts.map((product, _id) => (
                    <option
                      key={_id}
                      className="text-[12px] md:text-sm font-medium"
                      value={product.name}
                    >
                      {product.name}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div>
              <button
                type="submit"
                className="w-full mt-2 h-[45px] rounded-[5px] bg-lime-400 text-black text-[14px] md:text-[16px] font-medium"
                disabled={Object.keys(formErrors).length > 0}
              >
                {showLoader ? <SmallLoader /> : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
