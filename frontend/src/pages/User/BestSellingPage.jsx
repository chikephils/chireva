import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import NoProduct from "../../Assests/img/NotFound.svg";
import Loader from "../../components/Layout/Loader";
import { getAllProducts } from "../../features/product/productSlice";

const BestSellingPage = () => {
  const products = useSelector((state) => state?.products?.products);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setLoading(true);
    if (products) {
      const sortedProducts = [...products].sort(
        (a, b) => a.originalPrice - b.originalPrice
      );
      setData(sortedProducts);
    }
    setLoading(false);
  }, [products]);

  return (
    <>
      <Header activeHeading={2} />
      <div className="bg-gradient-to-r from-gray-300 to-slate-500 ...  min-h-screen mt-[60px] md:mt-[100px]">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : (
          <div className={`${styles.section}`}>
            {data && data.length > 0 ? (
              <div className="grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-[30px] 800px:grid-cols-4 800px:gap-[40px] xl:grid-cols-5 xl:gap-[50px] 600px:grid-cols-3 600px:gap-[10px] py-10 justify-items-center">
                {data.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-9">
                {products.length === 0 ? (
                  <>
                    <img
                      src={NoProduct}
                      className="h-80 md:h-340"
                      alt="Not found"
                    />
                    <p className="text-sm md:text-xl text-black font-semibold my-2">
                      Product(s) not available
                    </p>
                  </>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BestSellingPage;
