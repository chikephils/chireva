import React, { useEffect, useRef, useState } from "react";
import {
  selectSeller,
  selectSellerLoading,
} from "../../features/shop/shopSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socketIO from "socket.io-client";
import { FcSms } from "react-icons/fc";
import Loader from "../Layout/Loader";
import SmallLoader from "../Layout/SmallLoader";
import { server } from "../../server";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const seller = useSelector(selectSeller);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller, setOnlineUsers]);

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
      currentChat?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getConversation();
  }, [seller, messages]);

  //Check if useris online
  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="px-2">
      <div className="flex items-center justify-center  py-4 sticky top-2 mb-2 bg-slate-300 z-50">
        <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black pb-2">
          <FcSms size={24} /> All Messages
        </h1>
      </div>
      {/* All Messages List */}
      <div className=" h-[65vh] overflow-y-scroll scrollbar-none pt-3 pb-2 mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center  h-[60vh] ">
            <Loader />
          </div>
        ) : (
          <>
            {conversations &&
              conversations.map((conversation, index) => (
                <MessageList
                  conversation={conversation}
                  key={index}
                  index={index}
                  setCurrentChat={setCurrentChat}
                  me={seller._id}
                  setUserData={setUserData}
                  userData={userData}
                  online={onlineCheck(conversation)}
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
  sellerLoading,
}) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveStatus(online);
    const userId = conversation.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [me, conversation,]);

  const handleClick = (id) => {
    navigate(`${id}`, {
      state: {
        conversation,
        user,
        online,
      },
    });
  };

  return (
    <div
      className={`w-full flex p-2 md:p-3 px-1 md:px-3 bg-gradient-to-l from-slate-100 to-slate-200 ... shadow-lg rounded-md ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } cursor-pointer`}
      onClick={handleClick}
    >
      <div className="relative" style={{ flexShrink: 0 }}>
        {loading ? (
          <SmallLoader />
        ) : (
          <>
            <img
              src={`${user?.avatar?.url}`}
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
          <h1 className="text-[18px] text-[#000]">{user?.firstName}</h1>
          <p className="text-[16px] text-[#000c]">
            {" "}
            {!sellerLoading && conversation?.lastMessageId !== user._id
              ? "You:"
              : user?.firstName?.split(0, 8) + ": "}{" "}
            {conversation?.lastMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardMessages;
