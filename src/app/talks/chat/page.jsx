"use client";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/context/UserContext";

export default function Chat() {
    const [chat, setChat] = useState([]);
    const { uid } = useContext(UserContext);
    const id = uid;

    const fetchChat = async () => {
        try {
            const response = await fetch(
                `http://localhost:9000/api/v1/chats/getAllChats/${id}`
            );
            const data = await response.json();
            console.log(data.chats);
            setChat(data.chats);
            //setChat(data.chat);
            //setReceiver(data.chat.participants.filter((p) => p.uid !== id)[0]);
            //setSender(data.chat.participants.filter((p) => p.uid === id)[0]);
            //console.log("receiver", data.chat.participants.filter((p) => p.uid !== id)[0]);
            //setChat(data);

            //setMessages(data.chat.messages);
            //setLoading(false);
        } catch (error) {
            console.error("Error fetching chat:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChat();
    }, []);

    return (
        <>
            <div className="w-3/4  p-4">
                <h2 className="text-2xl font-bold">Recent chats</h2>
                <div className="mt-4 gap-6 space-y-6">
                    {chat.map((ch) => (
                        <div onClick={() => window.location.href = `/talks/chat/${ch._id}`}
                            key={ch._id}
                            className="p-4 border cursor-pointer rounded-md flex items-center"
                        >
                            <div className="flex-shrink-0">
                                <span className="block w-10 h-10 bg-gray-300 rounded-full"></span>
                            </div>
                            <div className="ml-4 overflow-hidden">
                                <p className="font-bold truncate">
                                    {ch.participants.filter((p) => p.uid !== id)[0]?.name ||
                                        "Unknown"}
                                </p>{" "}
                                <p className="text-gray-500 text-sm truncate">
                                    {ch.messages[ch.messages.length-1]?.content || "No messages"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
