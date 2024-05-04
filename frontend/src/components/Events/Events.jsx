import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";
import NoEvent from "../../Assests/img/NotFound.svg";
import Loader from "../Layout/Loader";
import { selectEventLoading } from "../../features/event/eventSlice";

const Events = () => {
  const allEvents = useSelector((state) => state?.events?.events);
  const eventsLoading = useSelector(selectEventLoading);

  return (
    <div className={`${styles.section} border-b mb-4`}>
      <div>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>
        {eventsLoading ? (
          <div className="flex items-center justify-center pb-6">
            <Loader />
          </div>
        ) : (
          <>
            <div className="w-full grid">
              {allEvents?.length !== 0 && (
                <EventCard event={allEvents && allEvents[0]} />
              )}
            </div>
            <div className="w-full mb-3">
              {allEvents?.length === 0 && (
                <>
                  <div className="flex items-center justify-center">
                    <img
                      src={NoEvent}
                      alt="Not Found"
                      className="max-h-[250px]"
                    />
                  </div>
                  <p className="flex justify-center text-[16px] 800px:[20px] font-semibold">
                    No Events
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
