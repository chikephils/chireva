import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    let timer;
    if (
      timeLeft.days ||
      timeLeft.hours ||
      timeLeft.minutes ||
      timeLeft.seconds
    ) {
      timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    } else if (event) {
      axios.delete(`${server}/event/delete-shop-event/${event._id}`);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, event]);

  function calculateTimeLeft() {
    if (!event || !event.finishDate) return {};

    const difference = +new Date(event.finishDate) - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return {};
    }
  }

  const timerComponent = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span
        key={interval}
        className="text-[18px] 800px:text-[25px] font-medium text-blue-700"
      >
        {timeLeft[interval]}
        {interval}
        {"  "}
      </span>
    );
  });

  return (
    <div key={timeLeft}>
      {timerComponent.length ? (
        <span className="text-[18px] 800px:text-[25px] font-medium text-blue-700">
          {timerComponent} Left
        </span>
      ) : (
        <span className="text-red-400 text-[16px] 800px:text-[25px] mt-3 font-medium">
          Time's Up
        </span>
      )}
    </div>
  );
};

export default CountDown;
