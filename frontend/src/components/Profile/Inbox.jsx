import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { server } from "../../server";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import socketIO from "socket.io-client";
import TimeAgo from "timeago-react";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { RxCross1 } from "react-icons/rx";
import CreateLoader from "../Layout/createLoader";
const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const Inbox = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
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
  const { conversation, seller, online } = location.state;
  const [imgLoading, setImageLoading] = useState(false);
  const token = useSelector((state) => state.user?.token);

  const me = user?._id;

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user, setOnlineUsers]);

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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);
  console.log(messages);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
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
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: e,
    });

    try {
      await axios
        .post(`${server}/messages/create-new-message`, {
          images: e,
          sender: user._id,
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

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: user._id,
      }
    );
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const handleClick = () => {
    navigate("/profile/inbox");
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {isLoading ? (
        <div className="flex items-center justify-center  h-[60vh] ">
          <Loader />
        </div>
      ) : (
        <>
          {/* Message header */}
          <div className=" w-full h-[10vh] flex items-center justify-between py-2  bg-slate-300 px-2 rounded-lg">
            <div className="flex">
              <img
                src={`${seller?.avatar.url}`}
                alt="img"
                className="w-[60px] h-[60px] rounded-full"
              />
              <div className="pl-3">
                <h1 className="text-[18px] font-[600]">{seller?.shopName}</h1>
                <h1>{online ? "Active Now" : ""}</h1>
              </div>
            </div>
            <RxCross1
              size={30}
              className="cursor-pointer pr-2"
              onClick={handleClick}
            />
          </div>
          {/* Messages */}
          <div className="w-full rounded-lg flex flex-col pb-1">
            <div className=" h-[75vh] overflow-y-scroll scrollbar-none py-2 p-1 lg:px-4">
              {" "}
              {messages &&
                messages.map((message, index) => {
                  return (
                    <div key={index} className="flex flex-col" ref={scrollRef}>
                      <div
                        className={` flex w-full my-2 ${
                          message.sender === me
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {message.sender !== me && (
                          <img
                            src={`${seller?.avatar.url}`}
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
                                  ? "bg-white p-2 rounded shadow-lg"
                                  : "bg-[#67e19c] p-2 rounded shadow-lg"
                              } text-[#000]`}
                            >
                              {message?.text}
                            </div>
                          </div>
                        )}
                      </div>

                      <p
                        className={`text-[12px] text-black flex w-full ${
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
                user ? "justify-end pr-6" : "justify-start"
              }`}
            >
              {imgLoading && <CreateLoader />}
            </div>

            {/* send message input */}
            <form
              className="p-3  relative w-full flex justify-between items-center mb-2"
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
                <input
                  type="submit"
                  value="Send"
                  className="hidden"
                  id="send"
                />
                <label htmlFor="send">
                  <AiOutlineSend
                    size={20}
                    className="absolute right-4 top-5 cursor-pointer"
                  />
                </label>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Inbox;
