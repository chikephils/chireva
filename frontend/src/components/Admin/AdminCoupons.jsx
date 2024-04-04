import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";
import Loader from "../Layout/Loader";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const refreshCoupons = async () => {
    setShowLoader(true);
    try {
      const response = await axios.get(`${server}/coupon/get-all-coupon`, {
        withCredentials: true,
      });
      setCoupons(response.data.coupons);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    refreshCoupons();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Coupon Id",
      minWidth: 150,
      flex: 0.8,
      sortable: false,
    },
    {
      field: "shop",
      flex: 0.7,
      minWidth: 130,
      headerName: "Shop",
      type: "text",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Coupon Name",
      minWidth: 130,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "price",
      headerName: "value",
      minWidth: 90,
      flex: 0.6,
      sortable: false,
    },
  ];

  const rows = [];

  coupons &&
    coupons.forEach((coupon) => {
      rows.push({
        id: coupon._id,
        name: coupon.name,
        shop: coupon.shop.shopName,
        price: coupon.value + "%",
      });
    });

  return (
    <div className="h-full">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <FiPackage size={24} /> ALL COUPONS
        </h1>
      </div>
      <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-8">
        {showLoader === true ? (
          <div className="flex items-center justify-center h-[60vh]">
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

export default AdminCoupons;
