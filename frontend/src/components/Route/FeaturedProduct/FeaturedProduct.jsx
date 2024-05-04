import React from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { selectProductsLoading } from "../../../features/product/productSlice";
import { useSelector } from "react-redux";
import NoProduct from "../../../Assests/img/NotFound.svg";
import Loader from "../../Layout/Loader";

const FeaturedProduct = () => {
  const products = useSelector((state) => state?.products.products);
  const productsLoading = useSelector(selectProductsLoading);

  return (
    <div className={`${styles.section} !py-4 border-b my-6`}>
      <div className={`${styles.heading}`}>
        <h1>Featured Products</h1>
      </div>
      {productsLoading ? (
        <div className="flex items-center justify-center pb-6">
          <Loader />
        </div>
      ) : (
        <>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-[30px] 800px:grid-cols-4 800px:gap-[40px] xl:grid-cols-5 xl:gap-[50px] 600px:grid-cols-3 600px:gap-[10px] pb-10 justify-items-center">
              {products.map((product) => (
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
              <p className="text-[16px] 800px:text-[20px] font-semibold">
                No Featured Deals
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProduct;
