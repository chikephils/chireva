import React, { useEffect } from "react";
import Header from "../../components/Layout/Header";
import Categories from "../../components/Route/Categories/Categories";
import BestDeals from "../../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../../components/Events/Events";
import Sponsored from "../../components/Route/Sponsored";
import Footer from "../../components/Layout/Footer";
import Slider from "../../components/Layout/Slider";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../features/product/productSlice";
import { getAllEvents } from "../../features/event/eventSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllEvents());
  }, [dispatch]);
  return (
    <>
      <Header activeHeading={1} />
      <div className="bg-gradient-to-r from-slate-500 to-gray-500 ... mt-[60px] md:mt-[100px]">
        <Slider />
        <Categories />
        <Events />
        <BestDeals />
        <FeaturedProduct />
        <Sponsored />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
