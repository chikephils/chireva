import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import socketIO from "socket.io-client";
import { FcSms } from "react-icons/fc";
import Loader from "../Layout/Loader";
import SmallLoader from "../Layout/SmallLoader";
const ENDPOINT = "https://chireva-orevas-projects.vercel.app/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const user = useSelector((state) => state.user.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [currentChat, setCurrentChat] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sellerData, setSellerData] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
 

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        images: data.images,
        createdAt: Date.now(),
      });
    });
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      setIsLoading(true);
      try {
      
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
          { withCredentials: true }
        );

        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getConversation();
  }, [user, messages]);


  const onLlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="px-2">
      <div className="flex items-center justify-center  py-4 sticky top-2 mb-2">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <FcSms size={24} /> All Messages
        </h1>
      </div>

      {/* All Messages List */}
      <div className=" h-[70vh] overflow-y-scroll scrollbar-none pt-3 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center  h-[60vh] ">
            <Loader />
          </div>
        ) : (
          <>
            {conversations.length > 0 &&
              conversations.map((conversation, index) => (
                <MessageList
                  conversation={conversation}
                  key={index}
                  index={index}
                  setCurrentChat={setCurrentChat}
                  me={user?._id}
                  setSellerData={setSellerData}
                  sellerData={sellerData}
                  online={onLlineCheck(conversation)}
                  setActiveStatus={setActiveStatus}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};
const MessageList = ({
  conversation,
  index,
  me,
  online,
  setActiveStatus,
  userLoading,
}) => {
  const [active, setActive] = useState(0);
  const [seller, setSeller] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveStatus(online);
    const sellerId = conversation.members.find((user) => user !== me);
    const getSeller = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${server}/shop/get-shop-info/${sellerId}`
        );
        setSeller(response.data.shop);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSeller();
  }, [me, conversation,]);

  const handleClick = (id) => {
    navigate(`${id}`, {
      state: {
        conversation,
        seller,
        online,
      },
    });
  };

  return (
    <div
      className={`w-full flex p-2 md:p-3 px-1 md:px-3  border-[0.5px] shadow-lg rounded-md bg-gradient-to-r from-slate-100 to-slate-200 ... mb-3 ${
        active === index ? "bg-[00000010]" : "bg-transparent"
      } cursor-pointer`}
      onClick={handleClick}
    >
      <div className="relative" style={{ flexShrink: 0 }}>
        {loading ? (
          <SmallLoader />
        ) : (
          <>
            <img
              src={`${seller?.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] max-w-full rounded-full object-cover"
            />
            {online ? (
              <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
            ) : (
              <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
            )}
          </>
        )}
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="pl-3 max-h-[75px] overflow-hidden">
          <h1 className="text-[18px]"> {seller?.shopName}</h1>
          <p className="text-[16px] text-[#000c]">
            {!userLoading && conversation?.lastMessageId !== seller?._id
              ? "You:"
              : seller?.shopName?.slice(0, 8) + ": "}
            {""} {conversation?.lastMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInbox;
