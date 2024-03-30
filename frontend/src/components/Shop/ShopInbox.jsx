import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import { server } from "../../server";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import CreateLoader from "../Layout/createLoader";
import TimeAgo from "timeago-react";
import { RxCross1 } from "react-icons/rx";
import Loader from "../Layout/Loader";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const ShopInbox = () => {
  const { id } = useParams();
  const seller = useSelector((state) => state.shop.seller);
  const [isLoading, setIsLoading] = useState(true);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { conversation, user, online } = location.state;
  const [imgLoading, setImageLoading] = useState(false);

  const me = seller?._id;

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
      try {
        const response = await axios.get(
          `${server}/conversation/get-conversation/${conversation?._id || id}`,
          { withCredentials: true }
        );

        setCurrentChat(response.data.conversation);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getConversation();
  }, [conversation._id, id]);

  //get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/messages/get-all-messages/${currentChat?._id}`,
          { withCredentials: true }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

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

  const handleClick = () => {
    navigate("/dashboard-messages");
  };

  return (
    <div className="w-full h-[90vh] flex flex-col justify-between pb-8">
      {isLoading ? (
        <div className="flex items-center justify-center  h-[60vh] ">
          <Loader />
        </div>
      ) : (
        <>
          {/* Message header */}
          <div className=" flex items-center justify-between py-2 sticky top-2 mb-2 mt-2 bg-slate-300 px-2 rounded-lg">
            <div className="flex">
              <img
                src={`${user?.avatar.url}`}
                alt="img"
                className="w-[60px] h-[60px] rounded-full"
              />
              <div className="pl-3">
                <h1 className="text-[18px] font-[600]">{user?.firstName}</h1>
                <h1>{online ? "Active Now" : ""}</h1>
              </div>
            </div>
            <RxCross1
              size={20}
              className="cursor-pointer"
              onClick={handleClick}
            />
          </div>
          {/* Messages */}
          <div className=" h-[70vh] overflow-y-scroll scrollbar-none pt-3 pb-6 ml-2 lg:px-4">
            {" "}
            {messages &&
              messages.map((message, index) => {
                return (
                  <div key={index} className="flex flex-col" ref={scrollRef}>
                    <div
                      className={` flex w-full my-2 ${
                        message.sender === me ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.sender !== me && (
                        <img
                          src={`${user?.avatar.url}`}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full mr-3"
                        />
                      )}

                      {message.images && (
                        <img
                          src={`${message?.images?.url}`}
                          alt=""
                          className="w-[150px] h-[150px] object-contain rounded-[10px] mr-2"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      )}

                      {message.text && (
                        <div className="max-w-[250px] md:max-w-[300px] lg:max-w-[900px] p-2 rounded">
                          <div
                            className={`${
                              message?.sender === me
                                ? "bg-slate-200 p-2 rounded shadow-lg"
                                : "bg-[#98e6ba] p-2 rounded shadow-lg"
                            } text-[#000]`}
                          >
                            {message?.text}
                          </div>
                        </div>
                      )}
                    </div>

                    <p
                      className={`text-[12px] text-[#000000d3] flex w-full ${
                        message?.sender === me
                          ? "justify-end pr-2"
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
              seller ? "justify-end pr-6" : "justify-start"
            }`}
          >
            {imgLoading && <CreateLoader />}
          </div>
          {/* send message input */}
          <form
            className="p-3 relative w-full flex justify-between items-center mb-2"
            onSubmit={sendMessageHandler}
          >
            <div className="w-[30px]">
              <input
                type="file"
                name=""
                id="image"
                className="hidden"
                onChange={handleImageUpload}
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
                  className="absolute right-4 top-5 cursor-pointer"
                />
              </label>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ShopInbox;
