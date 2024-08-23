"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import UserContext from '@/context/UserContext';


const Layout = ({ children }) => {
    const { uid,mail,user } = useContext(UserContext);
    const id = uid;
    const [frnds, setFrnds] = useState([]);
    const [reqCount,setReqCount]=useState(0);

    const fetchCounts = async () => {
        const response = await fetch(`http://localhost:9000/api/v1/users/getFriendRequests/${id}`);
        const data = await response.json();
        console.log("data2", data.length);
        setReqCount(data.length);

    };

    useEffect(() => {
        fetchCounts();
    }, [id]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        
        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
    
          if (message.type === 'friendRequestCount') {
            setReqCount(message.count);
          }
        };
    
        return () => {
          ws.close();
        };
      }, []);



    const fetchFrnds = async () => {
        const response = await fetch(`http://localhost:9000/api/v1/users/getFriends/${id}`);
        const data = await response.json();
        console.log("data", data);
        setFrnds(data);
    };

    useEffect(() => {
        fetchFrnds();
    }, []);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-50 border-r">
                <div className="p-4">
                    <h2 className="text-xl font-bold">Your Friends</h2>
                    <div className="mt-4">
                        <div className="flex flex-col gap-3">
                            {frnds && frnds.map((frnd) => (
                                <Link href={`/talks/chat/${frnd._id}`} key={frnd._id}>
                                    <div className="p-4 border rounded-md flex items-center cursor-pointer">
                                        <div className="flex-shrink-0">
                                        <span className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                {frnd.email[0].toUpperCase()}
                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold">{frnd.name}</p>
                                            <p className="text-gray-500">{frnd.email}</p>
                                        </div>
                                        
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="mt-8 p-4">
                    <h3 className="font-bold text-xl">Overview</h3>
                    <ul className="mt-2 space-y-2">
                        <Link href="/talks/chat/addFrnd">
                            <li className="flex items-center">
                                <span className="block w-6 h-6 bg-gray-50 rounded-full mr-2">
                                    <Image src="https://static.vecteezy.com/system/resources/previews/020/936/584/original/add-friend-icon-for-your-website-design-logo-app-ui-free-vector.jpg" 
                                    alt="add friend" width={24} height={24}
                                    className='bg-gray-50'/>
                                </span>
                                <span className='text-lg font-semibold'>Add friend</span>
                            </li>
                        </Link>
                        <li className="flex items-center">
                            <span className="block w-6 h-6 bg-gray-50 rounded-full mr-2">
                                <Image src="https://www.clipartmax.com/png/full/200-2007257_facebook-logo-facebook-symbol-iphone-logo-symbol-friend-request-icon-png.png" 
                                alt="friend request" width={24} height={24}
                                className='mt-1 bg-gray-50' />
                            </span>
                            <span className='text-lg font-semibold'>Friend requests</span>
                            {/* a tag for showing count of friend requests */}
                            <span className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-full">{reqCount}</span>

                        </li>
                    </ul>
                </div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="flex items-center">
                    <span className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                {user[0].toUpperCase()}
                            </span>
                        <div className="ml-4">
                            <p className="font-bold">{user}</p>
                            <p className="text-sm text-gray-500">{mail}</p>
                        </div>
                        <button className="ml-auto text-gray-400 hover:text-gray-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 6a4 4 0 118 0 4 4 0 01-8 0zM2 14a8 8 0 0116 0H2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <aside className="max-h-screen container py-16 md:py-12 w-full">
                {children}
            </aside>
        </div>
    );
};

export default Layout;
