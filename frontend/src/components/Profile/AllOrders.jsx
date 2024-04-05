import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader";
import { getAllOrders } from "../../features/user/userSlice";

const AllOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [myOrders, setMyOrders] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllOrders(user._id))
      .unwrap()
      .then((response) => {
        setMyOrders(response);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            <Link to={`/user/order/details/${params.id}`}>
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
    <div className="h-full pb-10">
      <div className="flex items-center justify-center  py-2 sticky top-2 mb-2">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <HiOutlineShoppingBag size={24} /> My Orders
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

export default AllOrders;
