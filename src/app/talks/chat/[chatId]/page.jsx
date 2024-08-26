"use client";
import React from "react";
import UserContext from "@/context/UserContext";
import { useContext, useState, useEffect } from "react";
import QuestionTime from "@/components/utils/timeCalculater";
import Pusher from "pusher-js";
import CallNotification from "@/components/UI/callNotification.jsx";
import VideoCall from "@/components/utils/videoCall";

const ChatWindow = () => {
    const { chatId, uid,onlineUsers,handleCall } = useContext(UserContext);
    console.log("onUser",onlineUsers);
    const id = uid;
    //we need to set r2 as that user here whose user.profile===receiver.name from the onlineUsers array
    

    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [cont, setCont] = useState("");
    const [sender, setSender] = useState({
        name: "maneesh",
        email: "mane@gmail.com",
        friends: [],
        frndRequests: [],
    });
    const [receiver, setReceiver] = useState({
        name: "john",
        email: "john@gmail.com",
        friends: [],
        frndRequests: [],
    });
    

    useEffect(() => {
        fetchChat();
    }, []);

    const fetchChat = async () => {
        try {
            const response = await fetch(
                `http://localhost:9000/api/v1/chats/${chatId}`
            );
            const data = await response.json();
            setChat(data.chat);
            setReceiver(data.chat.participants.filter((p) => p.uid !== id)[0]);
            setSender(data.chat.participants.filter((p) => p.uid === id)[0]);
            //console.log("receiver", data.chat.participants.filter((p) => p.uid !== id)[0]);
            //setChat(data);

            setMessages(data.chat.messages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching chat:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: "ap2",
        });
    
        const channel = pusher.subscribe(`chat-${chatId}`);
        channel.bind("new-message", function (data) {
            setMessages((messages) => [...messages, data.message]);
        });
    
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [chatId]);
    
    const r2=onlineUsers.find((user)=>user.profile===receiver.name);


    const postMessage = async () => {
        try {
            const response = await fetch(
                `http://localhost:9000/api/v1/chats/${chatId}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sender: sender._id,
                        content: cont,
                    }),
                }
            );
            const data = await response.json();
            console.log("dataM", data);
            setCont("");
            //setMessages((messages) => [...messages, data.message]);
        } catch (error) {
            console.error("Error posting message:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center border-b">
                <div className="flex-shrink-0">
                    <span className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
                        {receiver.email[0].toUpperCase()}
                    </span>
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-bold">{receiver.name}</h2>
                    <p className="text-gray-500">{receiver.email}</p>
                    <p className="text-gray-500">
                    {/* //onlineUsers is an array of objects with profile and socketId,check if the profile is equal to receiver.name */}
                    {onlineUsers.map((user) => {
                        if(user.profile === receiver.name){
                            return <span className="text-green-500">Online</span>
                        }
                    }
                    )}
                    </p>
                </div>
                <div onClick={()=>handleCall(r2)}>
                    <button className="ml-auto p-2 bg-blue-600 text-white rounded-lg">
                        Call
                    </button>
                </div>
                
            </div>

            {/* Chat Messages */}
            
            <div className="bg-black">
                  <CallNotification />
                  <VideoCall />
            </div>
            <div className="flex-grow overflow-y-auto p-4 bg-green-500">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`p-4 my-2 rounded-lg max-w-xs ${message.sender === sender._id
                                ? "bg-blue-600 text-white ml-auto text-right"
                                : "bg-gray-100 mr-auto text-left"
                            }`}
                        style={{ wordBreak: "break-word" }}
                    >
                        {message.content}
                        <br />
                        <span className={`text-xs ${message.sender === sender._id ? "text-gray-200" : "text-gray-500"}`}>
                            {<QuestionTime createdAt={message.createdAt} />}
                        </span>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t flex items-center bg-white mb-16 z-20">
                <input
                    type="text"
                    value={cont}
                    onChange={(e) => setCont(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow bg-white p-2 border rounded-lg focus:outline-none"
                />
                <button
                    onClick={() => {
                        postMessage();
                    }}
                    className="ml-4 p-2 bg-blue-600 text-white rounded-lg"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
