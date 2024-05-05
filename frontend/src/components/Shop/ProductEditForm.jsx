import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { categoriesData } from "../../static/data";
import SmallLoader from "../Layout/SmallLoader";
import axios from "axios";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getShopProducts, selectSeller } from "../../features/shop/shopSlice";

const ProductEditForm = ({ setEdit, product }) => {
  const seller = useSelector(selectSeller);
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");
  const [originalPrice, setOriginalPrice] = useState(
    product?.originalPrice || " "
  );
  const [discountPrice, setDiscountPrice] = useState(
    product?.discountPrice || ""
  );
  const [stock, setStock] = useState(product?.stock || 0);
  const [showLoader, setShowLoader] = useState(false);
  const sellerToken = useSelector((state) => state.shop.sellerToken);
  const id = product?._id;
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleDiscountPriceChange = (e) => {
    setDiscountPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    await axios
      .put(
        `${server}/product/edit-product/${id}`,
        {
          name,
          description,
          category,
          originalPrice,
          discountPrice,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status >= 200 || response.status < 300) {
          dispatch(getShopProducts(seller._id));
          toast.success("Product edited Successfully");
        }
      })
      .catch((error) => {
        console.log("Error in Edit Product Page");
      })
      .finally(() => {
        setShowLoader(false);
        setEdit(false);
      });
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
      <div className="w-[90%] 800px:w-[40%] h-[80vh] md:h-[80vh] overflow-y-scroll scrollbar-none 800px:h-[75vh] bg-gradient-to-r from-slate-300 to-slate-400 ... rounded-md shadow-2xl relative p-1 800px:p-2 mt-4">
        <div className="w-full flex items-center justify-between pb-3 px-2">
          <h5 className=" text-base md:text-lg 800px:text-xl font-semibold text-center">
            Edit {product?.name}
          </h5>
          <RxCross1
            size={30}
            className="cursor-pointer"
            onClick={() => setEdit(false)}
          />
        </div>
        <div className="h-[70vh] overflow-y-scroll scrollbar-none pb-6 pt-1">
          <form onSubmit={handleSubmit} className="w-full px-4">
            <div>
              <label className=" block text-[14px] md:text-[16px] font-medium ">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder={product?.name}
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-sm"
              />
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder={product?.description}
                rows={4}
                className=" cursor-pointer appearance-none blappearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[45px] rounded-[5px]"
                value={category}
                onChange={handleCategoryChange}
              >
                <option
                  className="text-[12px] md:text-sm"
                  value={product?.category}
                >
                  {product?.category}
                </option>
                {categoriesData &&
                  categoriesData.map((type) => (
                    <option
                      className="text-[12px] md:text-sm font-medium"
                      value={type.title}
                      key={type.id}
                    >
                      {type.title}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Original Price
              </label>
              <input
                type="number"
                name="price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder={product?.originalPrice}
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Price (with discount) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={discountPrice}
                onChange={handleDiscountPriceChange}
                placeholder={product?.discountPrice}
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
            </div>
            <br />
            <div>
              <label className="block text-[14px] md:text-[16px] font-medium">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={stock}
                onChange={handleStockChange}
                placeholder={product?.stock}
                className=" h-[45px] cursor-pointer appearance-none block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-lime-400 focus:border-lime-500 text-[14px] md:text-[16px]"
              />
            </div>
            <br />
            <div className="w-full flex items-center justify-center pb-8">
              <button
                type="submit"
                className=" flex items-center justify-center cursor-pointer appearance-none  w-full px-3 h-[45px] border border-gray-300 rounded-md placeholder-white focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm bg-black text-white"
              >
                {showLoader ? <SmallLoader /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditForm;
