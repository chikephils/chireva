import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSeller } from "../../features/shop/shopSlice";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import {
  getShopProducts,
  deleteShopProduct,
  selectAllShopProducts,
} from "../../features/shop/shopSlice";
import { toast } from "react-toastify";
import { FiPackage } from "react-icons/fi";
import SellerProductCardDetails from "../Route/ProductCardDetails/SellerProductCardDetails";
import Loader from "../Layout/Loader";
import SmallLoader from "../Layout/SmallLoader";
import { selectError } from "../../features/product/productSlice";

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const seller = useSelector(selectSeller);
  const deleteError = useSelector(selectError);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoader, setShowLoader] = useState({});
  const shopProducts = useSelector(selectAllShopProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getShopProducts(seller._id));
    setIsLoading(false);
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    setShowLoader((prevStates) => ({ ...prevStates, [id]: true }));
    try {
      await dispatch(deleteShopProduct(id));
    } catch (error) {
      toast.error(deleteError);
    } finally {
      setShowLoader((prevStates) => ({ ...prevStates, [id]: false }));
    }
  };

  const openProductDetails = (productId) => {
    const product = shopProducts.find((item) => item._id === productId);
    setSelectedProduct(product);
    setIsOpen(true);
    console.log(isOpen);
  };
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
      headerName: "Product Name",
      minWidth: 130,
      flex: 1.0,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 90,
      flex: 0.6,
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
      headerName: "Sold-Out",
      minWidth: 80,
      flex: 0.6,
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
            <Button onClick={() => openProductDetails(params.row.id)}>
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

  shopProducts &&
    shopProducts.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: "\u20A6" + item.discountPrice,
        stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <div className="p-2">
      <div className="flex items-center justify-center  py-4 sticky top-2 mb-2 bg-slate-400 z-50">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <FiPackage size={24} /> Your Shop Products
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
      {isOpen && selectedProduct && (
        <SellerProductCardDetails
          setIsOpen={() => setIsOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
