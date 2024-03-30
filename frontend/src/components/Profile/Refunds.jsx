import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrders, selectAllOrders,selectOrderLoading } from "../../features/user/userSlice";

const Refunds = () => {
  const isLoading = useSelector(selectOrderLoading);
  const user = useSelector((state) => state.user.user);
  const orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders(user._id));
  }, [dispatch, user._id]);

  const data =
    orders &&
    orders.filter(
      (item) =>
        item.status === "Processing Refund" || item.status === "Refund Success"
    );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 130,
      flex: 0.7,
      sortable: false,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.7,

      cellClassName: (params) => {
        const status = params.value;
        return status === "Refund Success" ? "bg-green-400" : "bg-red-400";
      },
    },

    {
      field: "itemsQty",
      headerName: "items qty",
      type: "Number",
      minWidth: 100,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "total",
      headerName: "Total",
      type: "Number",
      minWidth: 90,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "",
      flex: 0.7,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/details/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  data &&
    data.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total:
          "\u20A6" +
          item.cart.reduce(
            (acc, item) => acc + item.discountPrice * item.quantity,
            0
          ),
        status: item.status,
      });
    });
  return (
    <div className="pl-2">
      <div className="flex items-center justify-center  py-2 sticky top-2 mb-2">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <HiOutlineReceiptRefund size={24} /> REFUNDS
        </h1>
      </div>
      <div className=" h-[70vh] overflow-y-scroll scrollbar-none pt-3 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center  h-[60vh] ">
            <Loader />
          </div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
            disableColumnMenu
            getRowId={(row) => row.id}
          />
        )}
      </div>
    </div>
  );
};

export default Refunds;
