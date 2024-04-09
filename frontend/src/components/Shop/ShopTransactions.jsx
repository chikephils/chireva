import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadSeller, selectSeller } from "../../features/shop/shopSlice";
import Loader from "../Layout/Loader";
import { FcMoneyTransfer } from "react-icons/fc";

const ShopTransactions = () => {
  const seller = useSelector(selectSeller);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(LoadSeller(seller?._id));
    setIsLoading(false);
  }, [dispatch, seller?._id]);

  useEffect(() => {
    setLoading(true);
    const sortedTransactions = [...seller.transactions].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setTransactions(sortedTransactions);
    setLoading(false);
  }, [seller]);

  return (
    <div className="h-full">
      <div className="flex items-center justify-center sticky h-[35px] bg-slate-200 py-3">
        <h1 className=" flex font-medium lg:text-[22px] lg:font-[600] text-black py-2">
          <FcMoneyTransfer size={24} /> Your Transactions
        </h1>
      </div>
      <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-12">
        {isLoading || loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader />
          </div>
        ) : transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              className="w-full max-h-[250px] p-2 border-2 border-lime-500 mb-4 bg-gradient-to-l from-slate-100 to-slate-200 ... shadow-lg rounded-md"
              key={transaction?._id}
            >
              <div className="flex flex-col">
                <div className="w-full flex justify-between mb-2">
                  <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                    ID:
                  </h2>
                  <span className="text-[14px] md:text-[16px] lg:text-[16px] font-medium">
                    {transaction?._id}
                  </span>
                </div>

                <div className="w-full flex justify-between mb-2">
                  <h2 className="text-[12px] md:text-[16px] lg:text-[16px]">
                    DATE:
                  </h2>
                  <span>{transaction?.createdAt?.slice(0, 10)}</span>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <h2 className="text-[12px] md:text-[16px] lg:text-[16px]">
                    AMOUNT:
                  </h2>
                  <span> &#x20A6;{transaction?.amount}</span>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <h2 className="text-[12px] md:text-[16px] lg:text-[16px]">
                    BANK:
                  </h2>
                  <span>{transaction?.bank}</span>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <h2 className="text-[12px] md:text-[16px] lg:text-[16px]">
                    ACCOUNT NO:
                  </h2>
                  <span>{transaction?.accountNumber}</span>
                </div>
                <div className="w-full flex justify-between mb-2">
                  <h2 className="text-[12px] md:text-[16px] lg:text-[16px]">
                    STATUS:
                  </h2>
                  <span>{transaction?.status}</span>
                </div>
                <div className="w-full flex justify-between">
                  <h2 className="text-[12px] md:text-[16px] lg:text-[16px]">
                    UPDATED:
                  </h2>
                  <span>{transaction?.updatedAt?.slice(0, 10)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-[18px] text-gray-500">No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopTransactions;
