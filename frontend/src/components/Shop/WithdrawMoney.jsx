import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadSeller, selectSeller } from "../../features/shop/shopSlice";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { AiOutlineDelete } from "react-icons/ai";
import SmallLoader from "../Layout/SmallLoader";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const seller = useSelector(selectSeller);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [data, setData] = useState(null);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(1000);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(
    seller?.availableBalance.toFixed(2)
  );
  const sellerToken = useSelector((state) => state.shop.sellerToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller._id) {
      axios
        .get(`${server}/shop/get-shop-info/${seller._id}`)
        .then((res) => {
          setAvailableBalance(res.data.shop.availableBalance.toFixed(2));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [seller._id]);

  useEffect(() => {
    axios
      .get(`${server}/payment/banks/flutterwave`)
      .then((res) => {
        setData(res.data.banks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${server}/shop/get-shop-info/${seller._id}`)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }, [seller._id]);

  const error = () => {
    toast.error("You don't have enough balance to withdraw!");
  };

  const clearFields = () => {
    setBankName("");
    setAccountNumber("");
  };

  const handleBankSearch = (input) => {
    const searchTerm = input.toLowerCase();
    const filtered = data.filter(
      (bank) =>
        bank.name.toLowerCase().includes(searchTerm) ||
        bank.code.includes(searchTerm)
    );
    setFilteredBanks(filtered);
  };

  const handleBankSelect = (selectedBank) => {
    setBankName(selectedBank.name);
    setFilteredBanks([]);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${server}/shop/delete-withdraw-method`, {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
      });
      toast.success("Withdraw method deleted successfully!");
      dispatch(LoadSeller());
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankName,
      accountNumber: accountNumber,
    };

    try {
      setLoading(true);
      await axios.put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Withdraw method updated successfully!");
      dispatch(LoadSeller());
      setBankName("");
      setAccountNumber("");
      setPaymentMethod(false);
    } catch (error) {
      console.log(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 1000 || withdrawAmount > seller?.availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      try {
        setIsLoading(true);
        const amount = withdrawAmount;

        await axios.post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          {
            headers: {
              Authorization: `Bearer ${sellerToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Withdrawal request is successful!");
        dispatch(LoadSeller());
      } catch (error) {
        toast.error(error.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-1">
      <div className="w-full md:w-[60%] lg:w-[50%] px-2 py-2 md:py-2">
        <div className="flex items-center justify-center sticky top-2 mb-2">
          <h5 className=" text-base md:text-lg lg:text-xl font-semibold text-center">
            Withdraw Money
          </h5>
        </div>
        <div className=" h-[70vh] rounded flex items-center justify-center flex-col overflow-y-scroll scrollbar-none pb-6">
          <h5 className="text-[16px] md:text-[18px] lg:text-[20px] pb-4">
            Available Balance: <strong>&#x20A6;{availableBalance}</strong>
          </h5>
          <div
            className={`${styles.button} text-white !h-[40px]  p-3 !rounded-xl`}
            onClick={() => (availableBalance < 1000 ? error() : setOpen(true))}
          >
            Withdraw
          </div>
        </div>
        {open && (
          <div className="fixed top-3 left-0 w-full h-screen bg-[#00000062] z-[5000] flex items-center justify-center pt-10 lg:pl-24 lg:pt-16">
            <div className="w-[90%] md:w-[70%] lg:w-[50%] h-[75vh] bg-slate-200 rounded-md shadow p-4 overflow-y-scroll scrollbar-none">
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  onClick={() => setOpen(false) || clearFields()}
                  className="cursor-pointer"
                />
              </div>
              {paymentMethod ? (
                <div>
                  <h1 className="text-center text-[16px] md:text-[20px] lg:text-[25px] font-poppins">
                    Add New Payment method
                  </h1>
                  <div className="w-full">
                    <form onSubmit={handleSubmit} className="w-full">
                      <div className="w-full block p-4">
                        <div className="w-full pb-2">
                          <label className="block pb-2 font-semibold">
                            {" "}
                            Bank{" "}
                          </label>
                          <input
                            type="text"
                            value={bankName}
                            onChange={(e) => {
                              setBankName(e.target.value);
                              handleBankSearch(e.target.value);
                            }}
                            className={`${styles.input} !border-lime-500`}
                            placeholder="Search for a bank..."
                          />
                          <>
                            {filteredBanks.map((bank) => (
                              <div
                                key={bank.id}
                                className={`${styles.input} !border-lime-500`}
                                onClick={() => handleBankSelect(bank)}
                              >
                                {bank.name}
                              </div>
                            ))}
                          </>
                        </div>
                        <div className="w-full pb-2">
                          <label className="block pb-2 font-semibold">
                            Account Number
                          </label>
                          <input
                            type="number"
                            className={`${styles.input} !border-lime-500`}
                            required
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            type="submit"
                            className={`${styles.button} !h-[40px]  p-3 mb-3 text-white`}
                            disabled={loading}
                          >
                            {loading ? "Adding..." : "Add"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-[18px] md:text-[20px] lg:text-[20px] font-semibold flex text-center justify-center md:mb-5">
                    Available Withdraw Methods
                  </h3>
                  {seller && seller?.withdrawMethod ? (
                    <div className=" my-3">
                      <div className="lg:flex w-full justify-between items-center">
                        <div className="lg:w-[50%]">
                          <h5 className="pb-2 flex items-center justify-center">
                            Account Number :{" "}
                            <strong>
                              {" "}
                              {seller?.withdrawMethod?.accountNumber}
                            </strong>
                          </h5>
                          <h5 className=" pb-2 flex items-center justify-center">
                            Bank :{" "}
                            <strong>{seller?.withdrawMethod?.bankName}</strong>
                          </h5>
                        </div>

                        <div className="800px:w-[50%] flex items-center justify-center">
                          {loading ? (
                            <SmallLoader />
                          ) : (
                            <>
                              {" "}
                              <AiOutlineDelete
                                size={25}
                                className="cursor-pointer"
                                onClick={() => handleDelete()}
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <br />
                      <h4 className=" flex items-center justify-center">
                        {" "}
                        Available Balance :
                        <strong>&#x20A6;{seller?.availableBalance}</strong>{" "}
                      </h4>
                      <br />
                      <div className="800px:flex w-full items-center justify-center">
                        <div className="flex items-center justify-center">
                          <input
                            type="number"
                            placeholder="Amount..."
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            className="800px:w-[100px] w-[full] border 800px:mr-3 p-1 rounded"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <div
                            className={`${styles.button} !h-[40px] !w-max p-3 text-white `}
                            onClick={withdrawHandler}
                          >
                            {isloading ? <SmallLoader /> : "Withdraw"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[14px] md:text-[16px] lg:text-[18px] flex items-center justify-center pt-2">
                        No Withdraw Methods available!
                      </p>
                      <div className="w-full flex items-center justify-center">
                        <div
                          className={`${styles.button} text-[#fff] text-[18px] mt-4`}
                          onClick={() => setPaymentMethod(true)}
                        >
                          Add new
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawMoney;
