import React, { useEffect, useState } from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSideBar from "../../components/Shop/Layout/DashBoardSideBar";
import styles from "../../styles/styles";
import AllEvents from "../../components/Shop/AllEvents";
import { useDispatch, useSelector } from "react-redux";
import {
  getShopEvents,
  selectAllShopEvents,
  selectSeller,
} from "../../features/shop/shopSlice";
import SellerEventDetails from "../../components/Events/SellerEventDetails";

const ShopAllEvents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const seller = useSelector(selectSeller);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const shopAllEvents = useSelector(selectAllShopEvents);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getShopEvents(seller._id));
    setIsLoading(false);
  }, [dispatch, seller._id]);

  const handleEventClick = (eventId) => {
    const event = shopAllEvents.find((item) => item._id === eventId);
    setSelectedEvent(event);
    setIsOpen(true);
  };
  return (
    <>
      <DashBoardHeader active={5} />
      <div className={`${styles.section} w-full flex mt-[62px]`}>
        <div className=" w-[20%] md:w-[20%] 800px:w-[20%] fixed  mt-1 h-[calc(100%-62px)] bg-gradient-to-r from-slate-200 to-slate-400 ...  shadow-md  rounded-md py-4 flex items-center">
          <DashBoardSideBar active={5} />
          <div
            className={`w-[78%] ml-[21%] h-[calc(100%-62px)] fixed  pb-4 bg-gradient-to-l from-slate-300 to-slate-400 ...  rounded-md shadow-md px-1 md:px-2 py-2`}
          >
            <AllEvents
              handleEventClick={handleEventClick}
              shopEvents={shopAllEvents}
              seller={seller}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      {isOpen && selectedEvent && (
        <SellerEventDetails
          setIsOpen={() => setIsOpen(false)}
          event={selectedEvent}
        />
      )}
    </>
  );
};

export default ShopAllEvents;
