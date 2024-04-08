import React, { useEffect, useState } from "react";
import { logoutSeller, selectSeller } from "../../features/shop/shopSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getShopProducts } from "../../features/shop/shopSlice";
import SmallLoader from "../Layout/SmallLoader";

const ShopInfo = ({ isOwner, shop }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const seller = useSelector(selectSeller);
  const { id } = useParams();
  const sellerToken = useSelector((state) => state.shop?.sellerToken);

  useEffect(() => {
    dispatch(getShopProducts(id))
      .unwrap()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, id]);

  const handleShopLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${server}/shop/logout`, {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
      });
      dispatch(logoutSeller());
      navigate("/");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalReviewsLength =
    data && data.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    data &&
    data.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${shop?.avatar?.url || seller?.avatar?.url}`}
            alt="avatar"
            className="w-[70px] md:w-[90px] lg:w-[150px] h-[70px] md:h-[90px] lg:h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[16px] lg:text-[20px] font-medium">
          {shop?.shopName || seller?.shopName}
        </h3>
      </div>
      <div className="p-3">
        <h5 className="font-[600] text-[14px] md:text-[16px] lg:text-[inherit]">
          Description
        </h5>
        <h4 className="text-black text-[12px] md:text-[14px] lg:text-base font-normal">
          {shop?.description || seller?.description}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600] text-[14px] md:text-[16px] lg:text-[inherit]">
          Address
        </h5>
        <h4 className="text-black text-[12px] md:text-[14px] lg:text-base font-normal">
          {shop?.address || seller?.address}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600] text-[14px] md:text-[16px] lg:text-[inherit]">
          Phone Number
        </h5>
        <h4 className="text-black text-[12px] md:text-[14px] lg:text-base font-normal">
          {shop?.phoneNumber || seller?.phoneNumber}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600] text-[14px] md:text-[16px] lg:text-[inherit]">
          Total Products
        </h5>
        <h4 className="text-black text-[12px] md:text-[14px] lg:text-base font-normal">
          {" "}
          {data && data.length}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600] text-[14px] md:text-[16px] lg:text-[inherit]">
          Shop Ratings
        </h5>
        <h4 className="text-black text-[12px] md:text-[14px] lg:text-base font-normal">
          {(averageRating / 5).toFixed(2)}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600] text-[14px] md:text-[16px] lg:text-[inherit]">
          Joined On
        </h5>
        <h4 className="text-black text-[12px] md:text-[14px] lg:text-base font-normal">
          {shop?.createdAt
            ? shop?.createdAt.slice(0, 10)
            : "N/A" || seller?.createdAt
            ? seller?.createdAt.slice(0, 10)
            : "N/A"}
        </h4>
      </div>
      {isOwner && (
        <div className="py-3 px-1 md:px-4">
          <Link to="/dashboard-settings">
            <div
              className={`${styles.sm_button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className=" text-[14px] md:text-[16px] lg:text-base text-white font-medium">
                {" "}
                Edit Shop
              </span>
            </div>
          </Link>

          <div
            className={`${styles.sm_button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={handleShopLogout}
          >
            {isLoading ? (
              <SmallLoader />
            ) : (
              <span className="text-white text-[14px] md:text-[16px] lg:text-base font-medium">
                {" "}
                Logout
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopInfo;
