"use client";
import UserContext from "@/context/UserContext";
import { useContext } from "react";

const CallNotification = () => {
    const { ongoingCall, handleJoinCall } = useContext(UserContext);

    if (!ongoingCall?.isRinging) {
        console.log("ongoingCall>>", ongoingCall);
        return null;
    }
    console.log("ongoingCall", ongoingCall);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 md:w-1/3">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Incoming Call</h2>
                <p className="text-gray-600 mb-6">You have an incoming call from {ongoingCall.callerName || "someone"}.</p>
                
                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={() => handleJoinCall(ongoingCall)}
                        className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all duration-300 ease-in-out"
                    >
                        Accept
                    </button>
                    <button 
                        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CallNotification;
