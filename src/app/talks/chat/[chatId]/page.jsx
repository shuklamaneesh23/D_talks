import React from "react";

const ChatWindow = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center p-4 border-b">
                <div className="flex-shrink-0">
                    <span className="block w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                        M
                    </span>
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-bold">Maneesh Shukla</h2>
                    <p className="text-gray-500">shuklamaneesh24@gmail.com</p>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-6 bg-gray-50 overflow-y-auto">
                <div className="flex items-end mb-4">
                    <div className="flex-shrink-0">
                        <span className="block w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            M
                        </span>
                    </div>
                    <div className="ml-4 p-2 bg-gray-200 rounded-lg">
                        <p className="text-gray-800">hi</p>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">11:36</span>
                </div>

                <div className="flex items-end justify-end mb-4">
                    <span className="mr-2 text-sm text-gray-500">11:36</span>
                    <div className="ml-4 p-2 bg-blue-600 text-white rounded-lg">
                        <p>How are you?</p>
                    </div>
                    <div className="flex-shrink-0">
                        <span className="block w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            M
                        </span>
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t flex items-center">
                <input
                    type="text"
                    placeholder="Message Maneesh Shukla"
                    className="flex-grow p-2 border rounded-lg focus:outline-none"
                />
                <button className="ml-4 p-2 bg-blue-600 text-white rounded-lg">Post</button>
            </div>
        </div>
    );
};

export default ChatWindow;
