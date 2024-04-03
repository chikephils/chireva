import React, { useState } from "react";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { FiPackage } from "react-icons/fi";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import SmallLoader from "../Layout/SmallLoader";

const AllCoupons = ({ refreshCoupons, coupons, isLoading, setIsOpen }) => {
  const [showLoader, setShowLoader] = useState(false);

  const handleDelete = async (id) => {
    setShowLoader(true);
    try {
      const response = await axios.delete(
        `${server}/coupon/delete-coupon/${id}`,
        {
          withCredentials: true,
        }
      );
      refreshCoupons();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setShowLoader(false);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Coupon Id",
      minWidth: 130,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Coupon Name",
      minWidth: 130,
      flex: 1.0,
      sortable: false,
    },
    {
      field: "price",
      headerName: "value",
      minWidth: 90,
      flex: 0.6,
      sortable: false,
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

  coupons &&
    coupons.forEach((coupon) => {
      rows.push({
        id: coupon._id,
        name: coupon.name,
        price: coupon.value + "%",
      });
    });

  return (
    <div className="p-2">
      <div className="sticky top-2 mb-2 bg-slate-400 z-50 ">
        <div className="flex w-full items-center justify-end">
          <div
            className={`${styles.button} !w-max !h-[45px] px-2 shadow-xl !rounded-[5px] mr-3`}
            onClick={() => setIsOpen(true)}
          >
            <span className="text-white font-semibold">Create Coupon Code</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-center ">
          <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
            <FiPackage size={24} /> Your Discount Coupons
          </h1>
        </div>
      </div>
      <div className=" h-[70vh] overflow-y-scroll scrollbar pt-3 pb-6">
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

export default AllCoupons;
