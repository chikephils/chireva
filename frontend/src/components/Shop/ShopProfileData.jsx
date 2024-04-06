import React, { useEffect, useState } from "react";
import SellerProductCard from "../Route/ProductCard/SellerProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch } from "react-redux";
import { getShopEvents, getShopProducts } from "../../features/shop/shopSlice";
import { toast } from "react-toastify";
import SellerEventCard from "../Events/SellerEventCard";
import Ratings from "../ProductDetails/Ratings";
import Loader from "../Layout/Loader";
import TimeAgo from "timeago-react";

const ShopProfileData = ({ isOwner }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getShopProducts(id))
      .unwrap()
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching shop products:", error);
      });
  }, [dispatch, id]);

  return (
    <div className="w-full lg:pr-2 ">
      <div className="flex w-full items-center justify-between sticky top-0 left-0 z-10 bg-slate-300 px-2 overflow-x-scroll scrollbar-none shadow-lg rounded-lg">
        <div className="w-full flex ">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[14px] lg:text-[20px] ${
                active === 1 ? "text-red-500" : "text-black"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[14px] lg:text-[20px] ${
                active === 2 ? "text-red-500" : "text-black"
              } cursor-pointer pr-[20px]`}
            >
              {" "}
              Running Events
            </h5>
          </div>
          <div className="flex items-center " onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[14px] lg:text-[20px] ${
                active === 3 ? "text-red-500" : "text-black"
              } cursor-pointer pr-[20px]`}
            >
              {" "}
              Shop Reviews
            </h5>
          </div>
        </div>
        <div className="pl-4">
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.sm_button} !rounded-[4px] h-[42px]`}>
                  <span className="text-white text-[14px] lg:text-[16px] font-medium">
                    {" "}
                    Dashboard
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />

      <>
        {active === 1 && <ShopProductsTab data={data} isLoading={isLoading} />}
        {active === 2 && <RunningEventsTab />}
        {active === 3 && <ShopReviewsTab data={data} isLoading={isLoading} />}
      </>
    </div>
  );
};

const ShopProductsTab = ({ data, isLoading }) => {
  return (
    <div className={`${styles.section}`}>
      {isLoading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      ) : data && data.length === 0 ? (
        <div className="flex items-center justify-center font-semibold text-[16px] md:text-[20px]">
          No products available.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-3 md:gap-[30px] lg:grid-cols-3 lg:gap-[40px] xl:grid-cols-4 xl:gap-[50px] 600px:grid-cols-3 600px:gap-[10px] 800px:grid-cols-4 800px:gap-[20px] pb-10 justify-items-center">
          {data &&
            data.map((product) => (
              <SellerProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

const RunningEventsTab = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getShopEvents(id))
      .unwrap()
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  return (
    <div>
      <>
        {isLoading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : data && data.length === 0 ? (
          <div className="flex items-center justify-center font-semibold text-[16px] md:text-[20px]">
            No Events available.
          </div>
        ) : (
          <div className="flex flex-col pb-2 p-2 ">
            {data &&
              data.map((event) => (
                <SellerEventCard key={event._id} event={event} />
              ))}
          </div>
        )}
      </>
    </div>
  );
};

const ShopReviewsTab = ({ data, isLoading }) => {
  const allReviews = data && data.map((product) => product.reviews).flat();

  return (
    <div>
      <>
        {isLoading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : allReviews && allReviews.length === 0 ? (
          <div className="flex items-center justify-center font-semibold text-[16px] md:text-[20px]">
            No Reviews available.
          </div>
        ) : (
          <div className="flex flex-col pb-2 px-2 ">
            {allReviews &&
              allReviews.map((item, index) => (
                <div
                  className="w-full flex my-4 bg-gradient-to-l from-slate-100 to-slate-200 ... border-[1px] shadow-lg rounded-md p-2"
                  key={index}
                >
                  <img
                    src={`${item.user.avatar?.url}`}
                    className="w-10 h-10 rounded"
                    alt=""
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="font-[500] pr-2">
                        {item.user?.firstName}
                      </h1>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className="font-[400] text-[#000000a7]">
                      {item?.comment}
                    </p>
                    <p className="text-[#000000a7] text-[14px]">
                      <TimeAgo datetime={item?.createdAt} />
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </>
    </div>
  );
};

export default ShopProfileData;
