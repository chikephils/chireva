import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdminOrders,
  selectAdminOrders,
  selectAdminOrdersLoading,
} from "../../features/admin/adminSlice";
import { FiPackage } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";

const AdminOrders = () => {
  const adminOrders = useSelector(selectAdminOrders);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAdminOrdersLoading);

  useEffect(() => {
    dispatch(getAllAdminOrders());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.value;
        // console.log("status:", status);
        const className = status === "Delivered" ? "greenColor" : "redColor";
        // console.log("className:", className);
        return className;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.5,
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
      flex: 0.8,
      minWidth: 130,
      headerName: "Order Date",
      type: "",
      sortable: false,
    },
    {
      field: "",
      minWidth: 70,
      headerName: "",
      type: "number",
      sortable: false,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order-details/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={18} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        itemsQty: item.cart.length,
        total:
          "\u20A6" +
          item.cart.reduce(
            (acc, item) => acc + item.discountPrice * item.quantity,
            0
          ),
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="h-full pb-10">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black py-2">
          <FiPackage size={24} /> Orders
        </h1>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center  h-[60vh] ">
          <Loader />
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          autoPageSize
          disableColumnMenu
        />
      )}
    </div>
  );
};

export default AdminOrders;
