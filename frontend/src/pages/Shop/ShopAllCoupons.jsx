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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopProducts(seller._id));
  }, [dispatch, seller._id]);

  const refreshCoupons = async () => {
    try {
      const response = await axios.get(
        `${server}/coupon/get-coupon/${seller._id}`,
        {
          withCredentials: true,
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
      <div className=" mt-[62px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={9} />
          <div
            className={`w-[78%] ml-[21%] mt-1  h-full fixed  pb-4 rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg px-1 md:px-2 lg:px-4 `}
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
