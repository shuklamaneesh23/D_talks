"use client"
import React, { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { create } from "canvas-confetti";



const AllFrnds = () => {
    const { uid,setChatId } = useContext(UserContext);
    const id = uid;

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }
    , []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/users/getFriends/${id}`);
            const data = await response.json();
            setUsers(data);
            console.log("data", data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    }

    const createChat = async (friendId) => {
        //console.log("friendId", friendId);
        //console.log("id", id);
        try {
            const response = await fetch(`http://localhost:9000/api/v1/chats/createChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    participants: [id, friendId],
                }),
            });
            const data = await response.json();
            setChatId(data.chat._id);
            window.location.href = `/talks/chat/${data.chat._id}`;
            //send the user to the chat page

        } catch (error) {
            console.error("Error creating chat:", error);
        }
    }


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All friends</h2>
            <ul className="space-y-4">
                {users.map((user) => (
                    <li
                        key={user._id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                    >
                        <div className="flex items-center">
                            <span className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                {user.email[0].toUpperCase()}
                            </span>
                            <div className="ml-4">
                                <h3 className="text-lg font-bold">{user.email}</h3>
                                <p className="text-gray-500">{user.name}</p>
                            </div>
                        </div>
                        
                        <button
                        onClick={() => {createChat(user.uid)}}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Chat 
                        </button>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllFrnds;