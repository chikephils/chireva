import React, { useEffect, useState } from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import AllProducts from "../../components/Shop/AllProducts";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopProducts,
  selectAllShopProducts,
  selectSeller,
} from "../../features/shop/shopSlice";
import SellerProductCardDetails from "../../components/Route/ProductCardDetails/SellerProductCardDetails";
import ProductEditForm from "../../components/Shop/ProductEditForm";

const ShopAllProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const seller = useSelector(selectSeller);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedEdit, setSelectedEdit] = useState(null);
  const shopProducts = useSelector(selectAllShopProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getShopProducts(seller._id));
    setIsLoading(false);
  }, [dispatch, seller._id]);

  const handleProductClick = (productId) => {
    const product = shopProducts.find((item) => item._id === productId);
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleProductEdit = (productId) => {
    const product = shopProducts.find((item) => item._id === productId);
    setSelectedEdit(product);
    setEdit(true);
  };
  return (
    <>
      <DashBoardHeader active={3} />
      <div className={`${styles.section} w-full flex mt-[62px]`}>
        <div className=" w-[20%] md:w-[20%] 800px:w-[20%] fixed  mt-1 h-[calc(100%-62px)] bg-gradient-to-r from-slate-200 to-slate-400 ...  shadow-md  rounded-md py-4 flex items-center">
          <DashBoardSideBar active={3} />
          <div
            className={`w-[78%] ml-[21%] h-[calc(100%-62px)] fixed pb-4 bg-gradient-to-l from-slate-300 to-slate-400 ...  rounded-md shadow-md px-1 md:px-2 py-2`}
          >
            <AllProducts
              handleProductClick={handleProductClick}
              handleProductEdit={handleProductEdit}
              shopProducts={shopProducts}
              seller={seller}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      {isOpen && selectedProduct && (
        <SellerProductCardDetails
          setIsOpen={() => setIsOpen(false)}
          product={selectedProduct}
        />
      )}
      {edit && selectedEdit && (
        <ProductEditForm
          setEdit={() => setEdit(false)}
          product={selectedEdit}
        />
      )}
    </>
  );
};

export default ShopAllProducts;
