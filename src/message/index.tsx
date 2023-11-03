import React, { useState, useEffect, useRef } from "react";
import Layout from "../layout";
import { Preloader, Toaster } from "../data/stuff";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  getMessage,
  insertMessage,
  listUsers,
  setChat,
} from "../query/message";
import {
  arrDupMessageProps,
  arrMessageProps,
  arrUserPorps,
  messageProps,
} from "../types/message";
const Message = () => {
  return (
    <>
      <Layout>
        <Detail />
      </Layout>
    </>
  );
};

const Detail = () => {
  const [showtoaster, setshowtoaster] = useState(false);
  const [loading, setloading] = useState(false);
  const [toasterdata, settoasterdata] = useState({ type: "", message: "" });
  const [collectdata, setcollectdata] = useState<messageProps>({
    message: "",
    chatId: "",
    clientId: "",
    clinicId: "",
  });
  const [axioschat, setaxioschat] = useState(arrUserPorps);
  const [axiosmessage, setaxiosmessage] = useState([]);
  const [activechat, setactivechat] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setloading(true);
    listUsers().then((response) => {
      setaxioschat(response.data.data);
      setloading(false);
    });
  }, []);

  const formChange1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcollectdata({
      ...collectdata,
      [e.target.name]: e.target.value,
    });
  };

  const setchat = (user: string) => {
    setactivechat(user);
    setloading(true);

    setChat(user).then((response) => {
      console.log(response.data.data);
      setcollectdata({
        ...collectdata,
        message: "",
        chatId: response.data.data.user._id,
        clientId: localStorage.getItem("clinicUser")!,
        clinicId: localStorage.getItem("clinicId")!,
      });
      setaxiosmessage(response.data.data.message);
      setloading(false);
    });
  };
  const sendMessage = () => {
    setloading(true);
    if (collectdata.message == "") {
      settoasterdata({ type: "error", message: "Message required." });
      showToaster();
      setloading(false);
      return;
    }
    insertMessage(collectdata as messageProps).then((response) => {
      console.log(response.data.data);
      setcollectdata({
        ...collectdata,
        message: "",
        clientId: localStorage.getItem("clinicUser")!,
      });
      setaxiosmessage(response.data.data);
      setloading(false);
    });
  };
  const showToaster = () => {
    setshowtoaster(!showtoaster);
    setTimeout(() => {
      setshowtoaster(false);
    }, 3000);
  };

  const refereshMessage = () => {
    if (collectdata.chatId == "") {
      settoasterdata({ type: "error", message: "Please select chat" });
      showToaster();
      setshowtoaster(true);
      return;
    }
    setloading(true);
    getMessage(collectdata as messageProps).then((response) => {
      setaxiosmessage(response.data.data);
      setloading(false);
    });
  };
  type messagesComProps = {
    messages: arrDupMessageProps;
  };
  const Messages = (props: messagesComProps) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const [allmessages, setallmessages] = useState(arrMessageProps);
    useEffect(() => {
      scrollToBottom();
      setallmessages(props.messages);
    }, []);

    return (
      <div>
        {allmessages !== undefined &&
          allmessages.map((dd) => {
            return (
              <>
                {dd.clientId == localStorage.getItem("clinicUser") ? (
                  <div className="flex justify-end mb-4">
                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      <div
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: dd.message,
                        }}
                      />
                    </div>
                    <img
                      src="/images/user-profile.webp"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex justify-start mb-4">
                    <img
                      src="/images/user-profile.webp"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                      <div
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: dd.message,
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  const filteredData = axioschat.filter((item) =>
    item.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? <Preloader /> : ""}
      {showtoaster ? (
        <Toaster type={toasterdata.type} message={toasterdata.message} />
      ) : (
        ""
      )}
      <div className="relative">
        <div className="">
          {/* <!-- This is an example component --> */}
          <div className="container mx-auto shadow-lg rounded-lg">
            {/* <!-- headaer --> */}
            <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
              <div className="font-semibold text-2xl">GouriChat</div>
              <div className="w-1/2 hidden">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="search IRL"
                  className="form-input"
                />
              </div>
              <div className="">
                <div className="flex items-center gap-x-2">
                  <div className="">
                    <button
                      title="Referesh"
                      className="btn btn-primary"
                      onClick={refereshMessage}
                    >
                      <ArrowPathIcon className="w-5" />
                    </button>
                  </div>
                  <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                    GC
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end header --> */}
            {/* <!-- Chatting --> */}
            <div className="flex flex-row justify-between bg-white">
              {/* <!-- chat list --> */}
              <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                {/* <!-- search compt --> */}
                <div className="border-b-2 py-4 px-2">
                  <input
                    type="text"
                    placeholder="search chatting"
                    className="form-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* <!-- end search compt --> */}
                {/* <!-- user list --> */}
                {filteredData !== undefined &&
                  filteredData.map((dd) => {
                    return (
                      <>
                        <div
                          className={`flex flex-row py-4 px-2 justify-center items-center border-b-2 ${
                            activechat == dd.userId
                              ? "border-b-2 border-l-4 border-blue-400"
                              : ""
                          } hover:cursor-pointer`}
                          onClick={() => setchat(dd.userId)}
                        >
                          <div className="w-1/4">
                            <img
                              src="/images/user-profile.webp"
                              className="object-cover h-12 w-12 rounded-full"
                              alt=""
                            />
                          </div>
                          <div className="w-full">
                            <div className="text-lg font-semibold">
                              {dd.fullname}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                {/* <!-- end user list --> */}
              </div>
              {/* <!-- end chat list --> */}
              {/* <!-- message --> */}
              <div className="w-full px-5 flex flex-col justify-between relative">
                <div className="flex flex-col mt-5 min-h-[500px] max-h-[500px] overflow-y-scroll overflow-x-hidden">
                  <Messages messages={axiosmessage} />
                </div>
                <div className="py-5 bottom-0">
                  <div className="">
                    <div className="">
                      <textarea
                        className="form-textarea w-full"
                        name="message"
                        onChange={(e) => {
                          formChange1(e);
                        }}
                        value={collectdata.message}
                      ></textarea>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={() => sendMessage()}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end message --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
