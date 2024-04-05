import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { CiMoneyBill } from "react-icons/ci";

const AdminWithdrawRequest = () => {
  const [withdrawals, setWithdrawals] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/withdraw/get-all-withdrawal-request`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setWithdrawals(res.data.withdrawals);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Transaction ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.value;
        return status === "Processing" ? "bg-yellow-400" : "bg-green-400";
      },
    },
    {
      field: "shop",
      headerName: "Shop",
      type: "",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Withdraw Amount",
      type: "",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      flex: 0.8,
      minWidth: 130,
      headerName: "Withdrawal Date",
      type: "",
      sortable: false,
    },
    {
      field: "",
      minWidth: 70,
      headerName: "",
      type: "number",
      sortable: false,
      flex: 0.7,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/withdrawal-details/${params.id}`}>
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

  withdrawals &&
    withdrawals.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        shop: item.seller.shopName,
        amount: "\u20A6" + item?.amount,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="h-full pb-10">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <CiMoneyBill size={24} /> Withdrawal Request
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

export default AdminWithdrawRequest;
