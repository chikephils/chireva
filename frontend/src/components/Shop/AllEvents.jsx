import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { MdOutlineLocalOffer } from "react-icons/md";
import Loader from "../Layout/Loader";
import { selectEventError } from "../../features/event/eventSlice";
import { deleteShopEvent } from "../../features/shop/shopSlice";
import SmallLoader from "../Layout/SmallLoader";

const AllEvents = ({ handleEventClick, shopEvents, isLoading }) => {
  const eventError = useSelector(selectEventError);
  const [showLoader, setShowLoader] = useState({});
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    setShowLoader((prevStates) => ({ ...prevStates, [id]: true }));
    try {
      dispatch(deleteShopEvent(id));
    } catch (error) {
      toast.error(eventError);
    } finally {
      setShowLoader((prevStates) => ({ ...prevStates, [id]: false }));
    }
  };

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
      headerName: "Event Name",
      minWidth: 130,
      flex: 1.0,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 80,
      flex: 0.6,
      sortable: false,
    },
    {
      field: "start",
      headerName: "Start-Date",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
    },
    {
      field: "finish",
      headerName: "Finish-Date",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 60,
      flex: 0.5,
      sortable: false,
    },

    {
      field: "Preview",
      flex: 0.4,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleEventClick(params.row.id)}>
              <AiOutlineEye size={18} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.4,
      minWidth: 80,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
            {showLoader[params.id] ? (
                <SmallLoader />
              ) : (
                <AiOutlineDelete size={18} />
              )}
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  shopEvents &&
    shopEvents.forEach((event) => {
      rows.push({
        id: event._id,
        name: event.name,
        price: "\u20A6" + event.discountPrice,
        stock: event.stock,
        start: event.startDate.slice(0, 10),
        finish: event.finishDate.slice(0, 10),
        sold: 10,
      });
    });

  return (
    <div className="h-full pb-10">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[22px] lg:font-[600] text-black py-3p">
          <MdOutlineLocalOffer size={24} /> Your Shop Events
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

export default AllEvents;
