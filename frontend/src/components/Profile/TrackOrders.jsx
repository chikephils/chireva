import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { MdOutlineTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import {
  getAllOrders,
  selectAllOrders,
  selectOrderLoading,
} from "../../features/user/userSlice";

const TrackOrders = () => {
  const isLoading = useSelector(selectOrderLoading);
  const user = useSelector((state) => state.user.user);
  const myOrders = useSelector(selectAllOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders(user._id));
  }, [dispatch, user._id]);

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
        return status === "Processing"
          ? "bg-yellow-400"
          : status === "Delivered" || status === "Refund Success"
          ? "bg-green-400"
          : "bg-red-400";
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
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      flex: 0.7,

      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/tracking/details/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={18} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  myOrders &&
    myOrders.forEach((item) => {
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
    <div className="h-full">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black py-2">
          <MdOutlineTrackChanges size={24} /> Track Orders
        </h1>
      </div>
      <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-6">
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
          />
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
