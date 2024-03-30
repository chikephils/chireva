import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSeller } from "../../features/shop/shopSlice";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { getShopEvents, deleteShopEvent } from "../../features/shop/shopSlice";
import { toast } from "react-toastify";
import { MdOutlineLocalOffer } from "react-icons/md";
import SellerEventDetails from "../Events/SellerEventDetails";
import Loader from "../Layout/Loader";
import { selectEventError } from "../../features/event/eventSlice";

const AllEvents = () => {
  const [shopEvents, setShopEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const seller = useSelector(selectSeller);
  const eventError = useSelector(selectEventError);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopEvents(seller._id))
      .unwrap()
      .then((response) => {
        setShopEvents(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching shop events:", error);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    // setShowLoader(true);
    try {
      dispatch(deleteShopEvent(id));
      console.log(id);
      toast.success("Event deleted successfully");
      // setShowLoader(false);
    } catch (error) {
      toast.error(eventError);
      // setShowLoader(false);
    }
  };

  console.log(shopEvents);

  const openEventDetails = (eventId) => {
    const openEvent = shopEvents.find((item) => item._id === eventId);
    setSelectedEvent(openEvent);
    setIsOpen(true);
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
            <Button onClick={() => openEventDetails(params.row.id)}>
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
              <AiOutlineDelete size={18} />
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
        price: "US$" + event.discountPrice,
        stock: event.stock,
        start: event.startDate.slice(0, 10),
        finish: event.finishDate.slice(0, 10),
        sold: 10,
      });
    });

  return (
    <div className="p-2">
      <div className="flex items-center justify-center  py-4 sticky top-2 mb-2 bg-slate-400 z-50">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <MdOutlineLocalOffer size={24} /> Your Shop Events
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
          />
        )}
      </div>
      {isOpen && selectedEvent && (
        <SellerEventDetails setIsOpen={setIsOpen} event={selectedEvent} />
      )}
    </div>
  );
};

export default AllEvents;
