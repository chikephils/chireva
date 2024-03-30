import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-8 px-5 my-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt="img"
            className=" w-[100px] lg:w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
            alt="img"
            className=" w-[100px] lg:w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://www.vectorlogo.zone/logos/apple/apple-ar21.png"
            alt="img"
            className=" w-[100px] lg:w-[150px] object-contain"
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://blogs.microsoft.com/wp-content/uploads/prod/2012/08/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen.jpg"
            alt="img"
            className=" w-[100px] lg:w-[150px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
