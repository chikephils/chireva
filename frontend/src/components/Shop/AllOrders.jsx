import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllShopOrders } from "../../features/shop/shopSlice";
import { selectSeller } from "../../features/shop/shopSlice";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import Loader from "../Layout/Loader";

const AllOrders = () => {
  const [shopOrders, setShopOrders] = useState(null);
  const seller = useSelector(selectSeller);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllShopOrders(seller._id))
      .unwrap()
      .then((response) => {
        setShopOrders(response);
      })
      .catch((error) => {
        console.error("Error fetching shop orders:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, seller._id]);

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
      field: " ",
      flex: 0.4,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/orders/${params.id}`}>
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

  shopOrders &&
    shopOrders.forEach((item) => {
      rows.push({
        id: item._id,
        status:
          item.status === "Processing Refund" ? "Refunds Request" : item.status,
        itemsQty: item.cart.length,
        total:
          "\u20A6" +
          item.cart.reduce(
            (acc, item) => acc + item.discountPrice * item.quantity,
            0
          ),
      });
    });

  return (
    <div className="h-full pb-10">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[22px] lg:font-[600] text-black py-3">
          <FiPackage size={24} /> Your Shop Orders
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
