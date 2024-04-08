import React, { useEffect, useState } from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import AllCoupons from "../../components/Shop/AllCoupons";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopProducts,
  selectAllProductsLoading,
  selectAllShopProducts,
  selectSeller,
} from "../../features/shop/shopSlice";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import CreateCoupon from "../../components/Shop/CreateCoupon";

const ShopAllCoupons = () => {
  const shopProducts = useSelector(selectAllShopProducts);
  const seller = useSelector(selectSeller);
  const isLoading = useSelector(selectAllProductsLoading);
  const [coupons, setCoupons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const sellerToken = useSelector((state) => state.shop.sellerToken);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopProducts(seller._id));
  }, [dispatch, seller._id]);

  const refreshCoupons = async () => {
    try {
      const response = await axios.get(
        `${server}/coupon/get-coupon/${seller._id}`,
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );
      setCoupons(response.data.couponCodes);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <DashBoardHeader active={9} />
      <div className={`${styles.section} w-full flex mt-[62px]`}>
        <div className=" w-[20%] md:w-[20%] lg:w-[20%] fixed  mt-1 h-[calc(100%-62px)] bg-gradient-to-r from-slate-200 to-slate-400 ...  shadow-md  rounded-md py-4 flex items-center">
          <DashBoardSideBar active={9} />
          <div
            className={`w-[78%] ml-[21%] h-[calc(100%-62px)] fixed  pb-4 bg-gradient-to-l from-slate-300 to-slate-400 ...  rounded-md shadow-md px-1 md:px-2 py-2`}
          >
            <AllCoupons
              refreshCoupons={refreshCoupons}
              coupons={coupons}
              isLoading={isLoading}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <CreateCoupon
          setIsOpen={setIsOpen}
          shopProducts={shopProducts}
          seller={seller}
          refreshCoupons={refreshCoupons}
        />
      )}
    </>
  );
};

export default ShopAllCoupons;
