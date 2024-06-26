import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopProducts,
  selectAllShopOrders,
  selectAllShopProducts,
} from "../../features/shop/shopSlice";
import { selectSeller } from "../../features/shop/shopSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import styles from "../../styles/styles";
import { MdBorderClear } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { getAllShopOrders } from "../../features/shop/shopSlice";
import { server } from "../../server";
import axios from "axios";
import Loader from "../Layout/Loader";
import { numbersWithCommas } from "../../utils/priceDisplay";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const seller = useSelector(selectSeller);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(selectAllShopOrders);
  const AllProducts = useSelector(selectAllShopProducts);
  const [shopOrders, setShopOrders] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(
    seller?.availableBalance.toFixed(2)
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(getShopProducts(seller._id))
      .unwrap()
      .then((response) => {
        setProducts(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching shop products:", error);
      });
  }, [dispatch, seller._id]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllShopOrders(seller._id))
      .unwrap()
      .then((response) => {
        setShopOrders(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching shop orders:", error);
      });
  }, [dispatch, seller._id]);

  useEffect(() => {
    if (seller._id) {
      axios
        .get(`${server}/shop/get-shop-info/${seller._id}`)
        .then((res) => {
          setAvailableBalance(res.data.shop.availableBalance.toFixed(2));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [seller._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.value;
        return status === "Processing"
          ? "bg-yellow-400"
          : status === "Delivered" || status === "Refund Success"
          ? "bg-green-400"
          : "bg-blue-300";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 0.4,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <>
              <Link to={`/dashboard/orders/${params.id}`}>
                <Button>
                  <AiOutlineArrowRight size={20} />
                </Button>
              </Link>
            </>
          </>
        );
      },
    },
  ];

  const row = [];

  shopOrders &&
    shopOrders.forEach((item) => {
      row.push({
        id: item._id,
        status:
          item.status === "Processing Refund" ? "Refunds Request" : item.status,
        itemsQty: item.cart.length,
        total:
          "\u20A6" +
          numbersWithCommas(
            item.cart.reduce(
              (acc, item) => acc + item.discountPrice * item.quantity,
              0
            )
          ),
      });
    });

  return (
    <div className="h-full">
      <div className="flex items-center justify-center sticky h-[35px] py-3">
        <h1 className=" flex font-medium 800px:text-[22px] 800px:font-[600] text-black py-2">
          Overview
        </h1>
      </div>
      <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-4">
        <div className="w-full block 800px:flex items-center justify-between">
          <div className="w-full mb-4 800px:w-[30%] min-h-[30vh] bg-gradient-to-l from-gray-50 to-slate-100 ... shadow-md rounded-md px-2 py-5">
            <div className="flex items-center">
              <TbCurrencyNaira size={30} className="mr-1" color="green" />
              <h3
                className={`${styles.productTitle} !text-[14px] leading-5 !font-[400] text-[#00000085]`}
              >
                Account Balance{" "}
                <span className="text-[12px]">(with 7% service charge)</span>
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[20px] font-[500]">
              &#x20A6; {numbersWithCommas(availableBalance)}
            </h5>
            <Link to="/dashboard-withdraw-money">
              <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
            </Link>
          </div>
          <div className="w-full mb-4 800px:w-[30%] min-h-[30vh] bg-gradient-to-l from-gray-50 to-slate-100 ... shadow-md rounded-md px-2 py-5">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[16px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Orders
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
              {orders?.length}
            </h5>
            <Link to="/dashboard-orders">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>
          <div className="w-full mb-4 800px:w-[30%] min-h-[30vh] bg-gradient-to-l from-gray-50 to-slate-100 ... shadow-md rounded-md px-2 py-5">
            <div className="flex items-center">
              <FiPackage size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[16px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Products
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
              {AllProducts?.length}
            </h5>
            <Link to="/dashboard-products">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
            </Link>
          </div>
        </div>
        <br />
        <h3 className=" text-[18px] md:text-[22px] pl-1 font-Poppins pb-2">
          Latest Orders
        </h3>
        <>
          {isLoading ? (
            <div className="flex items-center justify-center ml-8 ">
              <Loader />
            </div>
          ) : (
            <div className="h-[40vh]">
              <DataGrid
                rows={row}
                columns={columns}
                disableRowSelectionOnClick
                autoPageSize
                disableColumnMenu
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default DashboardHero;
