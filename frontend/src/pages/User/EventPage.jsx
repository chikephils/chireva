import React, { useEffect } from "react";
import Header from "../../components/Layout/Header";
import EventCard from "../../components/Events/EventCard";
import { useDispatch, useSelector } from "react-redux";
import NoProduct from "../../Assests/img/NotFound.svg";
import Loader from "../../components/Layout/Loader";
import {
  getAllEvents,
  selectEventLoading,
} from "../../features/event/eventSlice";

const EventPage = () => {
  const events = useSelector((state) => state?.events?.events);
  const loading = useSelector(selectEventLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  return (
    <>
      <Header activeHeading={4} />
      <div className="flex flex-col bg-gradient-to-r from-gray-300 to-slate-500 ... min-h-screen mt-[70px] md:mt-[100px]">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : (
          <div className="mb-12 px-3 py-10">
            <>
              {events && events.length > 0 ? (
                events.map((event) => (
                  <EventCard key={event._id} active={true} event={event} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  {events.length === 0 ? (
                    <>
                      <img
                        src={NoProduct}
                        className="h-80 md:h-340"
                        alt="Not found"
                      />
                      <p className="text-sm md:text-xl text-black font-semibold my-2">
                        Events not Available
                      </p>
                    </>
                  ) : null}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default EventPage;
