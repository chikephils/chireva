import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import NoProduct from "../../Assests/img/NotFound.svg";
import Loader from "../../components/Layout/Loader";
import {
  getAllProducts,
  selectProductsLoading,
} from "../../features/product/productSlice";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const products = useSelector((state) => state?.products?.products);
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);
  const productsLoading = useSelector(selectProductsLoading);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsOnline(navigator.onLine);
    if (categoryData === null) {
      const sortedData = [...products].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });

      setData(sortedData);
    } else {
      const d =
        products &&
        products.filter((product) => product.category === categoryData);
      setData(d);
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [categoryData, products]);

  return (
    <>
      <Header activeHeading={3} />
      <div className="min-h-screen bg-gradient-to-r from-gray-300 to-slate-500 ... mt-[60px] md:mt-[100px]">
        {productsLoading || loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : (
          <div className={`${styles.section}`}>
            {!isOnline ? (
              <h1 className="flex text-center justify-center w-full pb-[100px] text-[20px] font-bold">
                No Internet Connection
              </h1>
            ) : (
              <>
                {data && data.length > 0 ? (
                  <div className="grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-[30px] 800px:grid-cols-4 800px:gap-[40px] xl:gap-[50px] 2500px:grid-cols-5  600px:grid-cols-3 600px:gap-[10px] py-10 justify-items-center">
                    {data.map((product) => (
                      <ProductCard product={product} key={product._id} />
                    ))}
                  </div>
                ) : (
                  <div className=" flex flex-col items-center justify-center py-9">
                    {data.length === 0 ? (
                      <>
                        <img
                          src={NoProduct}
                          className="h-80 md:h-340"
                          alt="Not found"
                        />
                        <p className="text-sm md:text-xl text-black font-semibold my-2">
                          Product(s) not Available
                        </p>
                      </>
                    ) : null}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
