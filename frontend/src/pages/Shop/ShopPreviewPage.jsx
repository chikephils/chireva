import React, { useEffect, useState } from "react";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileDataUser from "../../components/Shop/shopProfileDataUser";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import Loader from "../../components/Layout/Loader";

const ShopPreviewPage = () => {
  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState({});
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    if (id) {
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
    }
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className={` bg-[#f5f5f5] lg:px-4 `}>
            <div className="w-full lg:flex justify-between">
              <div className="lg:w-[25%] bg-[#fff] rounded-[4px] shadow-sm lg:overflow-y-scroll scrollbar-none lg:sticky top-10 left-0 z-10">
                <div className="overflow-y-scroll scrollbar-none h-screen">
                  <ShopInfo isOwner={false} shopId={id} shop={shop} />
                </div>
              </div>

              <div className="800px:w-[72%] mt-4 800px:mt-['unset'] rounded-[4px]">
                <div className=" overflow-y-scroll scrollbar-none h-screen">
                  <ShopProfileDataUser isOwner={false} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShopPreviewPage;
