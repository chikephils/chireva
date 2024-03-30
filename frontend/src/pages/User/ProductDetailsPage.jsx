import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProducts from "../../components/ProductDetails/SuggestedProducts";
import { selectAllProducts } from "../../features/product/productSlice";
import { useSelector } from "react-redux";
import { selectAllEvents } from "../../features/event/eventSlice";
import Loader from "../../components/Layout/Loader";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const allProducts = useSelector(selectAllProducts);
  const allEvents = useSelector(selectAllEvents);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const eventDataItem = allEvents.find((event) => event?._id === id);
      if (eventDataItem) {
        setData(eventDataItem);
      }
    } else {
      const productItem = allProducts.find((product) => product?._id === id);
      if (productItem) {
        setData(productItem);
      }
    }
  }, [allProducts, allEvents, eventData, id]);

  return (
    <>
      <Header />
      <div className="mt-[70px] md:mt-[100px]">
        {data === null ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : (
          <>
            <ProductDetails product={data} />
            {!eventData && <>{data && <SuggestedProducts product={data} />}</>}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
