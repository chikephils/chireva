import axios from "axios";
import { CiMoneyBill } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { backend_url, server } from "../../server";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import SmallLoader from "../Layout/SmallLoader";
import { useSelector } from "react-redux";

const AdminWithdrawalDetails = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdrawal-request`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWithdrawals(res.data.withdrawals);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const withdrawal = withdrawals && withdrawals.find((item) => item._id === id);
  console.log(withdrawal);

  const updateWithdrawalStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${server}/withdraw/update-withdraw-request/${id}`,
        {
          sellerId: withdrawal?.seller?._id,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Withdrawal Status updated!");
        navigate("/admin/withdraw-request");
      } else {
        toast.error("Failed to Update withdrawal request");
      }
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "An Error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`py-4 min-h-screen mt-[60px] ${styles.section}`}>
      <div className="w-full h-[35px] bg-green-400 sticky top-0">
        <div className="flex justify-between p-2">
          <div className=" flex">
            <CiMoneyBill size={24} color="crimson" />
          </div>
          <div className="flex items-center">
            <h1 className="flex text-[18px] lg:text-[20px]">
              Withdrawal Details
            </h1>
          </div>
          <div className="flex">
            <RxCross1
              size={24}
              className=" cursor-pointer bg-red-500"
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
      <>
        {isLoading ? (
          <div className="flex items-center justify-center ml-8 h-[60vh]">
            <Loader />
          </div>
        ) : (
          <>
            <div className="w-full flex items-center justify-between gap-2 p-2">
              <h5 className="text-[00000084] text-[14px] md:text-[16px] lg:text-[base]">
                Transaction ID:{" "}
                <span className=" hidden 600px:inline-block">
                  #{withdrawal?._id}
                </span>
                <span className="inline-block 600px:hidden">
                  #{withdrawal?._id?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="text-[#00000084] text-[14px] md:text-[16px] lg:text-[base]">
                {" "}
                Placed on: <span>{withdrawal?.createdAt?.slice(0, 10)}</span>
              </h5>
            </div>

            <br />
            <div className="w-full md:flex items-center justify-start">
              <img
                src={`${backend_url}${withdrawal?.seller?.avatar}`}
                alt=""
                className="max-w-[100px] max-h-[120px] md:max-w[300px] md:max-h-[320px] lg:max-w[300px] lg:max-h-[320px] "
              />
              <div className="flex flex-col">
                <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                  <strong>Shop Name: </strong>{" "}
                  <span> {withdrawal?.seller?.shopName}</span>
                </h2>
                <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                  <strong>Shop Address: </strong>{" "}
                  <span> {withdrawal?.seller?.address}</span>
                </h2>
                <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                  <strong>Phone-Number: </strong>{" "}
                  <span> {withdrawal?.seller?.phoneNumber}</span>
                </h2>
                <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                  <strong>Shop Email: </strong>{" "}
                  <span>{withdrawal?.seller?.email}</span>
                </h2>
              </div>
            </div>
            <br />
            <div className="md:flex justify-between">
              <div className="flex flex-col">
                <h4 className=" text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
                  Withdrawal Details :
                </h4>
                <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                  {" "}
                  <strong> Amount:</strong>{" "}
                  <span> &#x20A6;{withdrawal?.amount}</span>
                </h2>
                <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                  {" "}
                  <strong> Bank:</strong>
                  <span> {withdrawal?.seller?.withdrawMethod?.bankName}</span>
                </h2>
                <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                  {" "}
                  <strong> Account Number:</strong>
                  <span>
                    {" "}
                    {withdrawal?.seller?.withdrawMethod?.accountNumber}
                  </span>
                </h2>
              </div>
              <br />
              <div>
                <h4 className="text-[16px] md:text-[18px] lg:text-[18px] font-semibold">
                  Withdrawal Status:
                </h4>
                {withdrawal?.status !== "succeeded" && (
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-[170px] mt-2 border h-[35px] rounded-[5px] cursor-pointer"
                  >
                    {["Processing", "succeeded"]
                      .slice(
                        ["Processing", "succeeded"].indexOf(withdrawal?.status)
                      )
                      .map((option, index) => (
                        <option
                          value={option}
                          className="text-[12px] lg:text-[14px] font-normal cursor-pointer"
                          key={index}
                        >
                          {option}
                        </option>
                      ))}
                  </select>
                )}

                {withdrawal?.status === "succeeded" ? (
                  <h2 className="text-[14px] md:text-[16px] lg:text-[16px]">
                    Succeeded
                  </h2>
                ) : null}

                {withdrawal?.status !== "succeeded" && (
                  <div>
                    <div
                      className={`${styles.button}  !w-max p-1  !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[35px] text-[14px]`}
                      onClick={updateWithdrawalStatus}
                    >
                      {loading ? <SmallLoader /> : "Update Status"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default AdminWithdrawalDetails;
