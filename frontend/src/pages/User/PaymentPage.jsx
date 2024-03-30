import React from "react";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import styles from "../../styles/styles";

const PaymentPage = ({ orderData, setShowPayment }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const config = {
    public_key: "FLWPUBK_TEST-4bfb059aab8ea1c5cd2cf17d7e73bd96-X",
    tx_ref: orderData?.paymentInfo.transactionId,
    amount: orderData?.totalPrice,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    redirect_url: "/pay",
    customer: {
      email: user.email,
      phone_number: user.phoneNumber,
      name: user.firstName + " " + user.lastName,
    },
    customizations: {
      title: "CHIREVA",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const createOrder = () => {
    axios
      .post(`${server}/order/create-order`, orderData)
      .then((response) => {
        console.log("Order created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        toast.error("Error creating order. Please try again.");
      });
  };

  return (
    <>
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-50 flex items-center justify-center shadow-xl">
        <div className="w-full h-screen overflow-y-scroll scrollbar-none bg-gray-400 rounded-md shadow-2xl relative p-2 py-3 ">
          <div className=" sticky top-0 right-0 z-50 cursor-pointer">
            <RxCross1
              size={24}
              className=" absolute right-0 cursor-pointer bg-red-500"
              onClick={() => setShowPayment(false)}
            />
          </div>
          <br />
          <br />
          <CheckoutSteps active={2} />
          <div className="w-full flex flex-col items-center py-8">
            <div className="w-[95%] lg:w-[80%] block lg:flex">
              <div className="w-full lg:w-[65%] ">
                <CartData orderData={orderData} />
              </div>

              <div className="w-full lg:w-[35%] lg:mt-0 mt-8">
                <Shipping orderData={orderData} />
              </div>
            </div>
            <div>
              <button
                className={`${styles.button} w-[150px] lg:w-[280px] mt-10 text-white font-medium`}
                onClick={() => {
                  createOrder();
                  const tx_ref = orderData.paymentInfo.transactionId;
                  handleFlutterPayment({
                    callback: (response) => {
                      console.log(response);
                      closePaymentModal(); // this will close the modal programmatically
                    },
                    onClose: () => {
                      axios
                        .delete(`${server}/order/delete-order`, {
                          data: { transaction_Id: tx_ref },
                        })
                        .then(() => {
                          navigate("/checkout");
                        })
                        .catch((error) => {
                          console.error("Error deleting order:", error);

                          toast.error(
                            "Error deleting order. Please try again."
                          );
                        });
                    },
                  });
                }}
              >
                Pay &#x20A6;{orderData?.totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const CartData = ({ orderData }) => {
  return (
    <div className="w-full lg:w-[95%] bg-[#ffffffbc] rounded-md  pb-8 shadow-lg">
      <h1 className="flex justify-center p-3 font-semibold text-[18px] mb-2">
        Order Summary
      </h1>
      <div>
        <ul>
          {orderData?.cart?.map((item) => (
            <div
              key={item._id}
              className="w-full flex items-center justify-between pb-2"
            >
              <div className="flex justify-center w-[30%]">
                <img
                  src={`${item.images && item?.images[0]?.url}`}
                  alt="img"
                  className="max-w-[50px] max-h-[50px] lg:max-w-[100px] lg:max-h-[60px]"
                />
              </div>
              <div className="flex justify-center w-[5%] font-semibold">
                {item.quantity}
              </div>
              <div className="flex justify-start w-[40%] font-semibold">
                {item?.name}
              </div>
              <div className="flex justify-start w-[20%] font-semibold pr-1">
                &#x20A6;{item.discountPrice * item.quantity}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Shipping = ({ orderData }) => {
  return (
    <div className=" w-full bg-[#ffffffa3] rounded-md p-2 shadow-lg">
      <h1 className="flex  font-semibold text-[18px] pb-1">Shipping Address</h1>
      <p> {orderData?.shippingAddress?.address1}</p>
      <p> {orderData?.shippingAddress?.address2}</p>
      <p> {orderData?.shippingAddress?.zipCode}</p>
      <p> {orderData?.shippingAddress?.city}</p>
      <p> {orderData?.shippingAddress?.country}</p>
    </div>
  );
};

export default PaymentPage;
