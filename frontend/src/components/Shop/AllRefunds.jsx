import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  getAllShopOrders,
  selectAllShopOrders,
  selectShopOrderLoading,
} from "../../features/shop/shopSlice";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { selectSeller } from "../../features/shop/shopSlice";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";

const AllRefunds = () => {
  const isLoading = useSelector(selectShopOrderLoading);
  const seller = useSelector(selectSeller);
  const orders = useSelector(selectAllShopOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopOrders(seller._id));
  }, [dispatch, seller._id]);

  const refundOrders =
    orders &&
    orders.filter(
      (order) =>
        order.status === "Processing Refund" ||
        order.status === "Refund Success"
    );

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.value;
        return status === "Refund Success" ? "bg-green-400" : "bg-red-400";
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
      flex: 0.5,
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

  refundOrders &&
    refundOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total:
          "\u20A6" +
          item.cart.reduce(
            (acc, item) => acc + item.discountPrice * item.quantity,
            0
          ),
        status:
          item.status === "Processing Refund" ? "Refunds Request" : item.status,
      });
    });

  return (
    <div className="h-full pb-10">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[22px] lg:font-[600] text-black py-3">
          <HiOutlineReceiptRefund size={24} /> Your Shop Refunds
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

export default AllRefunds;
