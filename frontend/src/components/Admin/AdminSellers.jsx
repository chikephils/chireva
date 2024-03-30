import React, { useEffect, useState } from "react";
import {
  getAllSellers,
  selectAllSellers,
  selectAllSellersLoading,
  deleteSeller,
} from "../../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { GrWorkshop } from "react-icons/gr";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";

const AdminSellers = () => {
  const sellers = useSelector(selectAllSellers);
  const isLoading = useSelector(selectAllSellersLoading);
  const dispatch = useDispatch();
  const [sellerId, setSellerId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteSeller(id));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Seller ID",
      minWidth: 130,
      flex: 0.7,
      sortable: false,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Address",
      type: "text",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "joinedAt",
      minWidth: 130,
      headerName: "joinedAt",
      type: "text",
      sortable: false,
      flex: 0.8,
    },
    {
      field: "  ",
      flex: 0.7,
      minWidth: 100,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },

    {
      field: " ",
      flex: 0.7,
      minWidth: 100,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setSellerId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  sellers &&
    sellers.forEach((seller) => {
      rows.push({
        id: seller._id,
        name: seller.shopName,
        email: seller.email,
        joinedAt: seller?.createdAt.slice(0, 10),
        address: seller.address,
      });
    });
  return (
    <div className="pl-2">
      <div className="flex items-center justify-center  py-2 sticky top-2 mb-2">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <GrWorkshop size={24} /> SELLERS
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

      {open && (
        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
          <div className="w-[95%] md:w-[70%] lg:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
            <div className="w-full flex justify-end cursor-pointer">
              <RxCross1 size={25} onClick={() => setOpen(false)} />
            </div>
            <h3 className="text-[20px] lg:text-[25px] text-center py-3 lg:py-5 font-Poppins text-[#000000cb]">
              Are you sure you want to delete this seller?
            </h3>
            <div className="w-full flex items-center justify-center">
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                onClick={() => setOpen(false)}
              >
                cancel
              </div>
              <div
                className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                onClick={() => setOpen(false) || handleDelete(sellerId)}
              >
                confirm
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSellers;
