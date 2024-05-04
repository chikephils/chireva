import React, { useEffect } from "react";
import {
  getAllAdminProducts,
  selectAdminAllProducts,
  selectAdminProductsLoading,
} from "../../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { numbersWithCommas } from "../../utils/priceDisplay";

const AdminProducts = () => {
  const isLoading = useSelector(selectAdminProductsLoading);
  const adminProducts = useSelector(selectAdminAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdminProducts());
  }, [dispatch]);

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
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

      minWidth: 80,
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
            <Link to={`/product/${params.id}`}>
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

  adminProducts &&
    adminProducts.forEach((product) => {
      rows.push({
        id: product._id,
        name: product.name,
        price: "\u20A6" + numbersWithCommas(product.discountPrice),
        stock: product.stock,
        sold: product?.sold_out,
      });
    });
  return (
    <div className="h-full pb-10">
      <div className="flex items-center justify-center sticky h-[35px]">
        <h1 className=" flex font-medium 800px:text-[25px] 800px:font-[600] text-black py-2">
          <FiPackage size={24} /> PRODUCTS
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

export default AdminProducts;
