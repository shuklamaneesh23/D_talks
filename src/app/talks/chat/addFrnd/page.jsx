"use client";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import axios from "axios";

const UserListWithRequests = () => {

    const { uid } = useContext(UserContext);
    const id = uid;

    const [users, setUsers] = useState([
        {
            "id": 1,
            "name": "John Doe",
            "email": "johndoe@example.com"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "janesmith@example.com"
        }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your API call
        fetchUsers();
    }, []);

    

    const fetchUsers = async () => {
        try {
            const response = await fetch(`https://d-talks-backend.vercel.app/api/v1/users/getUserWhoAreNotFriends/${id}`); // Replace with your API endpoint
            const data = await response.json();
            setUsers(data);
            console.log("data", data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    const sendFriendRequest = async (userId) => {
        try {
            const response = await axios.post('https://d-talks-backend.vercel.app/api/v1/users/sendFriendRequest', {
                uid: id,  // Assuming `id` is defined and correct
                fid: userId,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("id", id, userId);
            console.log("response", response.status);
            if (response.status==200) {
                console.log(`Friend request sent to user ${userId}`);
            } else {
                console.error(`Failed to send friend request to user ${userId}`);
            }
        } catch (error) {
            console.error(`Error sending friend request to user ${userId}:`, error);
        }
    }

    const handleSendRequest = (userId) => {
        // Replace with your API call to send a friend request
        sendFriendRequest(userId);        // You can also update the UI to show that the request has been sent
        // For example, you can disable the "Send Request" button for this user

        // You can also update the state to remove this user from the list
        setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== userId));


    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="overflow-y-auto flex-grow max-h-[80vh] mb-16">

            <ul className="space-y-4">
                {users.map((user) => (
                    <li
                        key={user.uid}
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
                            onClick={() => handleSendRequest(user.uid)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Send Request
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default UserListWithRequests;
