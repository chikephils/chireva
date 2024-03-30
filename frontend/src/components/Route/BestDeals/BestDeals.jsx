import React, { useState, useEffect } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import NoProduct from "../../../Assests/img/NotFound.svg";
import Loader from "../../Layout/Loader";
import { selectProductsLoading } from "../../../features/product/productSlice";

const BestDeals = () => {
  const products = useSelector((state) => state?.products?.products);
  const [data, setData] = useState([]);
  const productsLoading = useSelector(selectProductsLoading)

  useEffect(() => {
    const allProductsData = products ? [...products] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 4);
    setData(firstFive);
  }, [products]);

 

  return (
    <div className={`${styles.section}  border-b shadow-lg`}>
      <div className={`${styles.heading}`}>
        <h1>Best Deals</h1>
      </div>
      { productsLoading ? (
        <div className="flex items-center justify-center pb-6">
          <Loader />
        </div>
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="grid grid-cols-2 gap-[5px] md:grid-cols-4 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px] 600px:grid-cols-3 600px:gap-[10px]  pb-10 justify-items-center">
              {data.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center pb-4">
              <div className="flex items-center justify-center">
                <img
                  src={NoProduct}
                  alt="Not Found"
                  className="max-h-[250px]"
                />
              </div>
              <p className="text-[16px] lg:text-[20px] font-semibold">
                No Best Deals
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BestDeals;
