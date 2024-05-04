import React from "react";
import styles from "../styles/styles";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
      <div className="w-full h-screen overflow-y-scroll scrollbar-none bg-gray-200 rounded-md shadow-2xl relative p-2 py-3 ">
        <br />
        <br />
        <div className="flex items-center justify-center h-[50vh]">
          <div className="flex flex-col items-center justify-center">
            <h1>404 - Page not found</h1>
            <p className="mt-3 font-semibold text-center">
              The page you are looking for does not exist.
            </p>
            <div
              className={`${styles.button} w-[100px] 800px:w-[150px] mt-10`}
              onClick={() => navigate("/")}
            >
              <h5 className="text-white">OK</h5>
            </div>
          </div>
        </div>

        <br />
      </div>
    </div>
  );
};

export default NotFoundPage;
