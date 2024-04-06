import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { server } from "../../server";
import { toast } from "react-toastify";
import { selectUser } from "../../features/user/userSlice";
import { itemsInCart } from "../../features/cart/cartSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import PaymentPage from "../../pages/User/PaymentPage";


const Checkout = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(itemsInCart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState(null);

  function generateUniquePaymentId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 23;
    let result = "p";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  function generateTransactionId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 23;
    let result = "tx";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  const paymentSubmit = async () => {
    if (cart.length < 1) return toast.error("Please add some Items to Cart");
    if (!(address1 || address2) || !zipCode || !country || !city) {
      toast.error("Please Provide a delivery address !");
    } else {
      const paymentId = generateUniquePaymentId();
      const transaction_Id = generateTransactionId();
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
        paymentInfo: {
          id: paymentId,
          type: "",
          response: {},
          transactionId: transaction_Id,
        },
      };

      setOrderData(orderData);
      setShowPayment(true);
    }
  };

  const subTotalPrice = cart.reduce(
    (accumulator, item) => accumulator + item.discountPrice * item.quantity,
    0
  );

  const shipping = 1000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    try {
      const response = await axios.get(
        `${server}/coupon/get-coupon-value/${name}`
      );
      const shopId = response.data.couponCode?.shopId;
      const couponCodeValue = response.data.couponCode?.value;
      console.log(couponCodeValue);
      if (response.data.couponCode !== null) {
        const isCouponvalid =
          cart && cart.filter((item) => item.shopId === shopId);
        console.log(isCouponvalid);

        if (isCouponvalid.length === 0) {
          toast.error("Coupon code is not valid for this Shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponvalid.reduce(
            (accumulator, item) =>
              accumulator + item.quantity * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(response.data.couponCode);
          setCouponCode("");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setCouponCode("");
    }
  };

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPrice).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[95%] lg:w-[80%] block lg:flex">
        <div className="w-full lg:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            address2={address2}
            zipCode={zipCode}
            setZipCode={setZipCode}
            setAddress1={setAddress1}
            setAddress2={setAddress2}
          />
        </div>
        <div className="w-full lg:w-[35%] lg:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] lg:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
      {showPayment && (
        <PaymentPage orderData={orderData} setShowPayment={setShowPayment} />
      )}
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full lg:w-[95%] bg-white rounded-md p-2 lg:p-5 pb-8">
      <h5 className="text-[18px] font-[500]"> Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-medium"> Full Name</label>
            <input
              type="text"
              defaultValue={user && user.firstName + " " + user.lastName}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-medium">Email Address</label>
            <input
              type="email"
              defaultValue={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-medium">Phone Number</label>
            <input
              type="number"
              required
              defaultValue={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>

          <div className="w-[50%]">
            <label className="block pb-2 font-medium"> Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-medium"> Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block  text-[14px] lg:text-[16px] pb-2 font-semibold">
                Choose Country
              </option>
              {Country &&
                Country.getAllCountries().map((country) => (
                  <option
                    className="text-[12px] md:text-[14px] lg:text-base
                  font-medium"
                    key={country.isoCode}
                    value={country.isoCode}
                  >
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-medium"> City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block text-[14px] lg:text-[16px] pb-2 font-semibold">
                Choose a City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((state) => (
                  <option
                    className="text-[12px] md:text-[14px] lg:text-base
                  font-medium"
                    key={state.isoCode}
                    value={state.isoCode}
                  >
                    {state.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2 font-medium"> Address1</label>
            <input
              type="address"
              value={address1}
              required
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2 font-medium"> Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>
      </form>
      <div
        className={`${styles.button} !w-full !h-[45px] px-2 shadow-xl !rounded-[5px] mr-3 flex `}
        onClick={() => setUserInfo(!userInfo)}
      >
        <span className="text-white font-semibold">
          Choose From saved address
        </span>
      </div>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((address, index) => (
              <div key={index} className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3 cursor-pointer"
                  value={address.addressType}
                  onClick={() =>
                    setAddress1(address.address1) ||
                    setAddress2(address.address2) ||
                    setZipCode(address.zipCode) ||
                    setCountry(address.country) ||
                    setCity(address.city)
                  }
                />
                <h2>{address.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]"> Subtotal</h3>
        <h5 className="text-[18px] font-[600]">
          {" "}
          &#x20A6; {subTotalPrice.toFixed(2)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000e4]"> Shipping</h3>
        <h5 className="text-[18px] font-[600]">
          {" "}
          &#x20A6; {shipping.toFixed(2)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000e4]"> Discount</h3>
        <h5 className="text-[18px] font-[600]">
          - &#x20A6; {discountPercentage ? discountPercentage.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {" "}
        &#x20A6; {totalPrice}
      </h5>

      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply Code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
