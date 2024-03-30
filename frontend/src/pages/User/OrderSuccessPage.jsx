import React from "react";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import { IoMdCheckmarkCircle } from "react-icons/io";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = ({ transactionId }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
        <div className="w-full h-screen overflow-y-scroll scrollbar-none bg-gray-400 rounded-md shadow-2xl relative p-2 py-3 ">
          <br />
          <br />
          <CheckoutSteps active={3} />
          <div className=" h-[60vh] flex items-center justify-center ">
            <div className="flex flex-col items-center justify-center">
              <IoMdCheckmarkCircle size={58} color="green" />
              <h1 className="mt-3 text-center">
                {" "}
                Your order with Transaction ID: {`${transactionId}`} is
                successful 😍
              </h1>
              <div
                className={`${styles.button} w-[100px] lg:w-[150px] mt-10`}
                onClick={() => navigate("/")}
              >
                <h5 className="text-white">OK</h5>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
