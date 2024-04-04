import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSellers,
  selectAllSellers,
  getAllAdminOrders,
  selectAdminOrders,
  selectAdminOrdersLoading,
} from "../../features/admin/adminSlice";
import { TbCurrencyNaira } from "react-icons/tb";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const adminOrders = useSelector(selectAdminOrders);
  const isLoading = useSelector(selectAdminOrdersLoading);
  const sellers = useSelector(selectAllSellers);

  useEffect(() => {
    dispatch(getAllAdminOrders());
    dispatch(getAllSellers());
  }, [dispatch]);

  const adminEarnings =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalnce = adminEarnings?.toFixed(2);

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
      field: "createdAt",
      headerName: "Order Date",
      flex: 0.7,
      minWidth: 130,
      type: "number",
      sortable: false,
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        status: item.status,
        itemsQty: item?.cart?.length,
        total:
          "\u20A6" +
          item.cart.reduce(
            (acc, item) => acc + item.discountPrice * item.quantity,
            0
          ),
        createdAt: item?.createdAt?.slice(0, 10),
      });
    });

  return (
    <div className="h-full pb-6">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black py-2">
          Overview
        </h1>
      </div>
      <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-4">
        <div className="w-full block lg:flex items-center justify-between">
          <div className="w-[full] mb-4 lg:w-[30%] min-h-[25vh] bg-gradient-to-l from-gray-50 to-slate-100 ... rounded-md px-2 py-5 shadow-md">
            <div className="flex items-center">
              <TbCurrencyNaira size={30} className="mr-2" color="green" />
              <h3
                className={`${styles.productTitle} !text-[16px] leading-5 !font-[400] text-[#00000085]`}
              >
                Total Earnings{" "}
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[20px] font-[500]">
              &#x20A6;{adminBalnce}
            </h5>
          </div>
          <div className="w-full mb-4 lg:w-[30%] min-h-[25vh] bg-gradient-to-l from-gray-50 to-slate-100 ... shadow-md rounded-md px-2 py-5">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[16px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Sellers
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
              {sellers ? (sellers.length > 0 ? sellers.length : 0) : 0}
            </h5>
            <Link to="/admin/sellers">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
            </Link>
          </div>
          <div className="w-full mb-4 800px:w-[30%] min-h-[25vh] bg-gradient-to-l from-gray-50 to-slate-100 ... shadow-md rounded-md px-2 py-5">
            <div className="flex items-center">
              <FiPackage size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[16px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Orders
              </h3>
            </div>

            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
              {adminOrders
                ? adminOrders.length > 0
                  ? adminOrders.length
                  : 0
                : 0}
            </h5>

            <Link to="/admin/orders">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>
        </div>

        <br />
        <h3 className="text-[18px] md:text-[22px] font-Poppins pb-2">
          Latest Orders
        </h3>
        <>
          {isLoading ? (
            <div className="flex items-center justify-center ml-8 h-[30vh]">
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

export default AdminDashboard;
