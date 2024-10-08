"use client";
import React, { useState, useEffect, useContext } from "react";
import Pusher from "pusher-js";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import UserContext from "@/context/UserContext";

const Layout = ({ children }) => {
    const router = useRouter();
    const { uid, mail, user, setChatId } = useContext(UserContext);
    const id = uid;
    const [frnds, setFrnds] = useState([]);
    const [reqCount, setReqCount] = useState(0);
    const [userObj, setUserObj] = useState(null);
    const [loading, setLoading] = useState(true);  // Added loading state

    useEffect(() => {
        if (id) {
            const fetchCounts = async () => {
                try {
                    const response = await fetch(
                        `https://axios-week.onrender.com/api/v1/users/getUserEmailById/${id}`
                    );
                    const data = await response.json();
                    setUserObj(data);
                    setReqCount(data?.frndRequests?.length);
                    setLoading(false);  // Stop loading once data is fetched
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setLoading(false);  // Stop loading even if there's an error
                }
            };

            fetchCounts();
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
                cluster: "ap2",
            });

            const channel = pusher.subscribe("friend-requests");

            channel.bind("new-request", (data) => {
                if (data.recipientId === id) {
                    setReqCount(data.count);
                    console.log("New friend request received");
                }
            });

            return () => {
                channel.unbind_all();
                channel.unsubscribe();
            };
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const fetchFrnds = async () => {
                try {
                    const response = await fetch(
                        `https://axios-week.onrender.com/api/v1/users/getFriends/${id}`
                    );
                    const data = await response.json();
                    setFrnds(data);
                    setLoading(false);  // Stop loading once data is fetched
                } catch (error) {
                    console.error("Error fetching friends:", error);
                    setLoading(false);  // Stop loading even if there's an error
                }
            };

            fetchFrnds();
        }
    }, [id]);

    const createChat = async (friendId) => {
        try {
            const response = await fetch(
                `https://axios-week.onrender.com/api/v1/chats/createChat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        participants: [id, friendId],
                    }),
                }
            );
            const data = await response.json();
            setChatId(data.chat._id);
            router.push(`/talks/chat/${data.chat._id}`);
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading your data, please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[100vh]">
            {uid ? (
                <div className="w-1/4 bg-gray-50 border-r max-h-[100vh]">
                    <div className="mt-8 p-4">
                        <Link href="/talks/chat">
                            <h3 className="font-bold text-xl">Overview</h3>
                        </Link>
                        <ul className="mt-2 space-y-2">
                            <Link href="/talks/chat/addFrnd">
                                <li className="flex items-center">
                                    <span className="block w-6 h-6 bg-gray-50 rounded-full mr-2">
                                        <Image
                                            src="https://static.vecteezy.com/system/resources/previews/020/936/584/original/add-friend-icon-for-your-website-design-logo-app-ui-free-vector.jpg"
                                            alt="add friend"
                                            width={24}
                                            height={24}
                                            className="bg-gray-50"
                                        />
                                    </span>
                                    <span className="text-lg font-semibold">Add friend</span>
                                </li>
                            </Link>
                            <Link href="/talks/chat/frndRequests">
                                <li className="flex items-center">
                                    <span className="block w-6 h-6 bg-gray-50 rounded-full mr-2">
                                        <Image
                                            src="https://www.clipartmax.com/png/full/200-2007257_facebook-logo-facebook-symbol-iphone-logo-symbol-friend-request-icon-png.png"
                                            alt="friend request"
                                            width={24}
                                            height={24}
                                            className="mt-1 bg-gray-50"
                                        />
                                    </span>
                                    <span className="text-lg font-semibold">Friend requests</span>
                                    <span className="md:ml-2 bg-blue-500 text-white lg:px-3 lg:py-1 px-1 py-[1/4] rounded-full">
                                        {reqCount}
                                    </span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">Your Friends</h2>
                        <div className="mt-4">
                            <div className="flex flex-col gap-3">
                                {frnds.length > 0 ? (
                                    frnds.slice(0, 3).map((frnd) => (
                                        <Link href="#" key={frnd._id}>
                                            <div
                                                className="p-4 border rounded-md flex items-center cursor-pointer"
                                                onClick={() => createChat(frnd.uid)}
                                            >
                                                <div className="flex-shrink-0">
                                                    <span className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                                        {frnd.email[0].toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4 overflow-hidden">
                                                    <p className="font-bold">{frnd.name}</p>
                                                    <p className="text-gray-500 overflow-hidden">{frnd.email}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No friends found</p>
                                )}
                                <Link href="/talks/chat/allFrnds">
                                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
                                        Show all friends
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 max-h-2xl">
                        <div className="flex items-center">
                            <span className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                {user[0].toUpperCase()}
                            </span>
                            <div className="ml-4 overflow-hidden max-w-[120px] lg:max-w-[210px]">
                                <p className="font-bold">{user}</p>
                                <p className="text-sm text-gray-500 overflow-hidden">{mail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Please Login to Chat</div>
            )}
            <aside className="max-h-screen sticky py-8 w-full">{children}</aside>
        </div>
    );
};

export default Layout;
