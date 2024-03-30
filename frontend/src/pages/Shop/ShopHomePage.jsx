import React, { useEffect, useState } from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import Loader from "../../components/Layout/Loader";

const ShopHomePage = () => {
  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState({});
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        console.log(res);
        setShop(res.data.shop);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={`  mt-2 `}>
      <div className="w-full lg:flex  justify-between">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="lg:w-[24%]  bg-[#fff] rounded-xl shadow-2xl lg:overflow-y-scroll scrollbar-none lg:sticky top-3 left-0 z-10 h-[98vh]   lg:h-[98vh]">
              <div className="overflow-y-scroll scrollbar-none h-screen">
                <ShopInfo isOwner={true} shopId={id} shop={shop} />
              </div>
            </div>
          </>
        )}
        <div className="lg:w-[75%] rounded-[4px] mt-4 lg:mt-0">
          <div className=" overflow-y-scroll scrollbar-none h-screen">
            <ShopProfileData isOwner={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
