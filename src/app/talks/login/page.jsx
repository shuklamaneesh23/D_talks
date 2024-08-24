"use client";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { auth, googleProvider } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";
import { add } from "date-fns";

export default function RegisterLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
   

    const { setUser,setMail,user,setUid } = React.useContext(UserContext);

    const router = useRouter();


    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(null);

    const addUser=async({email,auth,name})=>{
        try {
            console.log("Adding user");
            console.log("name",name);
            const res=await axios.post("http://localhost:9000/api/v1/users/addUser",{
                email:email,
                name:name,
                uid:auth.currentUser.uid,
                imageUri:auth.currentUser.photoURL,
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                setError("");
                setMessage("Account created successfully. Please login");
                //addUser({email,auth});
                setIsOpen(true);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                setError("");
                setMessage("Logged in successfully");
                console.log("Logged in with email");
                console.log("User", auth.currentUser.displayName);
                //setUser(auth.currentUser.displayName);
                setMail(auth.currentUser.email);
                setUid(auth.currentUser.uid);
                //redirect to home page
                router.push("/");
            }
        } catch (err) {
            setMessage(null);
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            addUser({email:auth.currentUser.email,auth,name:auth.currentUser.displayName});
            console.log("Logged in with Google");
            //redirect to home page
            router.push("/");
            setUser(auth.currentUser.displayName);
            setMail(auth.currentUser.email);
            setUid(auth.currentUser.uid);
            console.log(user);
        } catch (err) {
            setError(err.message);
        }
    };


    const saveChanges = async () => {
        try {
            const res=await axios.post("http://localhost:8000/api/users",{
                email:email,
                username:username
            });
            console.log(res.data);
            console.log("username pasing to addUser",username);
            addUser({email,auth,name:username});
            setUser(username);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                    {isRegistering ? "Register" : "Login"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border text-black bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {message && <p className="text-green-500">{message}</p>}

                    <button
                        type="submit"
                        onClick={() => {if(isRegistering && !(message===null))setIsOpen(true)}}
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        {isRegistering ? "Register" : "Login"}
                    </button>
                </form>
                <button
                    onClick={handleGoogleSignIn}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                    Sign in with Google
                </button>
                <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                    {isRegistering
                        ? "Already have an account?"
                        : "Don't have an account?"}
                    <span
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-blue-500 cursor-pointer ml-1"
                    >
                        {isRegistering ? "Login" : "Register"}
                    </span>
                </p>
            </div>





            {/* dialog box code goes here */}




             {/* Overlay */}
             {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Dialog Box */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm mx-auto shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Choose username</h2>
                            
                        </div>
                        <p className="text-gray-400 mb-4">
                            Make sure to add your username here. Click save when you're done.
                        </p>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
                                onClick={() => {
                                    saveChanges();
                                    setIsOpen(false);
                                    console.log("Changes saved:", { email, username });
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
