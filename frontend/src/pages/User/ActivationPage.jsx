import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            setError(true);
          });
      };
      activationEmail();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="h-[70vh] mt-[60px] md:mt-[100px] flex items-center justify-center">
        {error ? (
          <div className="flex flex-col">
            <p className="font-semibold">Your token has Expired</p>
            <div className="flex items-center justify-center">
              <Link
                className="mt-3 font-semibold underline text-green-500 "
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <p className="font-semibold">
              Your acoount has been Created Successfully
            </p>
            <div className="flex items-center justify-center">
              <Link
                className="mt-3 font-semibold underline text-green-500 "
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ActivationPage;
