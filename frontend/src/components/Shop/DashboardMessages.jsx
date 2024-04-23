import React, { useEffect, useRef, useState } from "react";
import {
  selectSeller,
  selectSellerLoading,
} from "../../features/shop/shopSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import TimeAgo from "timeago-react";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
import socketIO from "socket.io-client";
import { FcSms } from "react-icons/fc";
import Loader from "../Layout/Loader";
import SmallLoader from "../Layout/SmallLoader";
import { server } from "../../server";
import CreateLoader from "../Layout/createLoader";
const ENDPOINT = "https://chireva.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const seller = useSelector(selectSeller);
  const [isLoading, setIsLoading] = useState(false);
  const sellerLoading = useSelector(selectSellerLoading);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const [imgLoading, setImageLoading] = useState(false);
  const sellerToken = useSelector((state) => state.shop.sellerToken);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

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
            headers: {
              Authorization: `Bearer ${sellerToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setConversations(response.data.conversations);
      } catch (error) {
        // console.log(error);
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

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/messages/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  // Send Message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/messages/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
            console.log(message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Send Image handler
  const handleImageUpload = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      } else {
        return;
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (e) => {
    setImageLoading(true);

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/messages/create-new-message`, {
          images: e,
          sender: seller._id,
          text: newMessage,
          conversationId: currentChat._id,
        })
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  };
  //Update last message
  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <div className="h-full">
      {!open && (
        <>
          <div className="flex items-center justify-center sticky h-[35px]">
            <h1 className=" flex font-medium lg:text-[25px] lg:font-[600] text-black py-2">
              <FcSms size={24} /> All Messages
            </h1>
          </div>
          {/* All Messages List */}
          <div className=" h-[calc(100%-38px)] overflow-y-scroll scrollbar-none pt-3 pb-12">
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
                      setOpen={setOpen}
                      open={open}
                      setCurrentChat={setCurrentChat}
                      me={seller._id}
                      setUserData={setUserData}
                      userData={userData}
                      online={onlineCheck(conversation)}
                      setActiveStatus={setActiveStatus}
                      sellerLoading={sellerLoading}
                    />
                  ))}
              </>
            )}
          </div>
        </>
      )}

      {open && (
        <div className="w-full pb-10">
          <SellerInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            sellerId={seller._id}
            userData={userData}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
            setMessages={setMessages}
            handleImageUpload={handleImageUpload}
            imgLoading={imgLoading}
            seller={seller}
          />
        </div>
      )}
    </div>
  );
};

const MessageList = ({
  conversation,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
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
  }, [me, conversation, setActiveStatus, online]);

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  console.log(user);

  return (
    <div
      className={`w-full flex p-2 md:p-3 px-1 md:px-3 bg-gradient-to-l from-slate-100 to-slate-200 ... shadow-lg rounded-md ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } cursor-pointer`}
      onClick={(e) =>
        setActive(index) ||
        handleClick(conversation._id) ||
        setCurrentChat(conversation) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
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
            {!sellerLoading && conversation?.lastMessageId !== me
              ? "You:"
              : user?.firstName?.split(0, 8) + ": "}{" "}
            {conversation?.lastMessage}
          </p>
        </div>
      )}
    </div>
  );
};

const SellerInbox = ({
  scrollRef,
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
  imgLoading,
  seller,
}) => {
  return (
    <div className="flex flex-col justify-between">
      {/* message header */}
      <div className=" w-full h-[10vh] flex items-center justify-between py-2  bg-slate-300 px-2 rounded-lg">
        <div className="flex">
          <img
            src={`${userData?.avatar?.url}`}
            alt="img"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">
              {userData?.firstName} {userData?.lastName}
            </h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages container */}
      <div className="w-full rounded-lg flex flex-col">
        <div className=" h-[60vh] overflow-y-scroll scrollbar-none py-2 shadow-xl">
          {" "}
          {messages &&
            messages.map((message, index) => {
              return (
                <div key={index} className="flex flex-col" ref={scrollRef}>
                  <div
                    className={` flex w-full my-2 ${
                      message.sender === sellerId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender !== sellerId && (
                      <img
                        src={`${userData?.avatar.url}`}
                        alt=""
                        className="w-[40px] h-[40px] rounded-full mr-3"
                      />
                    )}

                    {message.images && (
                      <img
                        src={`${message?.images?.url}`}
                        alt=""
                        className={`w-[150px] h-[150px] object-contain rounded-[10px] mr-2 `}
                      />
                    )}
                    {message.text && (
                      <div className="max-w-[250px] md:max-w-[300px] lg:max-w-[400px] p-2 rounded">
                        <div
                          className={`${
                            message.sender === sellerId
                              ? "bg-[#000] p-2 rounded"
                              : "bg-[#38c776] p-2 rounded"
                          } text-[#fff]`}
                        >
                          {message.text}
                        </div>
                      </div>
                    )}
                  </div>

                  <p
                    className={`text-[12px] text-[#000000d3] flex w-full ${
                      message.sender === sellerId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <TimeAgo datetime={message.createdAt} />
                  </p>
                </div>
              );
            })}
        </div>

        <div
          className={` flex w-full mt-4 ${
            !seller ? "justify-end pr-6" : "justify-start"
          }`}
        >
          {imgLoading && <CreateLoader />}
        </div>

        {/* message input */}
        <form
          className="relative w-full flex justify-between items-center mb-2"
          onSubmit={sendMessageHandler}
        >
          <div className="w-[30px]">
            <input
              type="file"
              name=""
              id="image"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
            <label htmlFor="image">
              <TfiGallery className="cursor-pointer" size={20} />
            </label>
          </div>
          <div className="w-full">
            <textarea
              type="text"
              required
              placeholder="Enter your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`${styles.input}`}
              rows={2}
            />
            <input type="submit" value="Send" className="hidden" id="send" />
            <label htmlFor="send">
              <AiOutlineSend
                size={20}
                className="absolute right-2 top-5 cursor-pointer"
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardMessages;
