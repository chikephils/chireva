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
        setShop(res.data.shop);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className={` 600px:px-2 `}>
            <div className="w-full 800px:flex justify-between">
              <div className="800px:w-[25%] bg-stone-200 rounded-[4px] shadow-sm  800px:sticky left-0 z-10 px-2 py-4 h-full">
                <div className="overflow-y-scroll scrollbar-none h-[95vh] bg-slate-400 rounded-md shadow-lg">
                  <ShopInfo isOwner={true} shopId={id} shop={shop} />
                </div>
              </div>

              <div className="800px:w-[72%]  800px:mt-['unset'] rounded-[4px] h-full py-4 ">
                <div className=" overflow-y-scroll scrollbar-none h-[96vh]">
                  <ShopProfileData isOwner={true} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ShopHomePage;
