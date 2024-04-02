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

const ShopAllProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const seller = useSelector(selectSeller);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const shopProducts = useSelector(selectAllShopProducts);
  const [isOpen, setIsOpen] = useState(false);
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
  return (
    <>
      <DashBoardHeader active={3} />
      <div className=" mt-[60px]">
        <div className={`${styles.section} w-full flex pb-10`}>
          <DashBoardSideBar active={3} />
          <div
            className={`w-[78%] ml-[21%] mt-2 h-[87vh] fixed overflow-y-scroll scrollbar-none pb-10 rounded-md bg-gradient-to-l from-slate-300 to-slate-400 ... shadow-lg px-1 md:px-2 `}
          >
            <AllProducts
              handleProductClick={handleProductClick}
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
    </>
  );
};

export default ShopAllProducts;
