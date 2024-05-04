import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdminEvents,
  selectAllAdminEvents,
  selectAdminEventsLoading,
} from "../../features/admin/adminSlice";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";

const AdminEvents = () => {
  const isLoading = useSelector(selectAdminEventsLoading);
  const adminEvents = useSelector(selectAllAdminEvents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminEvents());
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "Event Id",
      minWidth: 130,
      flex: 0.7,
      sortable: false,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.9,
    },

    {
      field: "price",
      headerName: "Price",
      minWidth: 80,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 70,
      flex: 0.6,
      sortable: false,
    },
    {
      field: "sold",
      minWidth: 80,
      headerName: "Sold out",
      type: "text",
      sortable: false,
      flex: 0.7,
    },
    {
      field: "Preview",
      flex: 0.7,
      minWidth: 80,
      headerName: " ",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  adminEvents &&
    adminEvents.forEach((event) => {
      rows.push({
        id: event._id,
        name: event.name,
        price: "\u20A6" + event.discountPrice,
        stock: event.stock,
        sold: event?.sold_out,
      });
    });
  return (
    <div className="h-full pb-10">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium 800px:text-[25px] 800px:font-[600] text-black py-2">
          <MdOutlineLocalOffer size={24} /> ALL EVENTS
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

export default AdminEvents;
