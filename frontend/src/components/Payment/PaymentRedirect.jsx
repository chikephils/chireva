import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import Loader from "../Layout/Loader";
import OrderSuccessPage from "../../pages/User/OrderSuccessPage";
import PaymentErrorPage from "../../pages/User/PaymentErrorPage";
import NotFoundPage from "../../pages/NotFoundPage";

const PaymentRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const txRef = queryParams.get("tx_ref");
  const transactionId = queryParams.get("transaction_id");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    if (!status || !txRef || !transactionId) {
      setLoading(false);
      return;
    }

    axios
      .get(
        `${server}/payment/verify-payment?tx_ref=${txRef}&transaction_id=${transactionId}&status=${status}`
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          setPaymentStatus("success");
          dispatch(clearCart());
          setLoading(false);
        } else {
          setPaymentStatus("failed");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setPaymentStatus("error");
        setLoading(false);
      });
  }, [status, txRef, transactionId, navigate, dispatch]);

  if (!status || !txRef || !transactionId) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="flex flex-col items-center justify-center">
        {loading && (
          <>
            <Loader />
            <p className="mt-3 font-semibold text-center">
              Please hold while we verify your payment, do not close this window
            </p>
          </>
        )}
        {!loading && paymentStatus === "success" && (
          <OrderSuccessPage transactionId={transactionId} />
        )}
        {!loading && paymentStatus === "failed" && (
          <PaymentErrorPage transactionId={transactionId} />
        )}
      </div>
    </div>
  );
};

export default PaymentRedirect;
