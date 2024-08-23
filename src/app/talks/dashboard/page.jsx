import React from "react";

const ChatSidebar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-50 border-r">
        <div className="p-4">
          <h2 className="text-xl font-bold">Your chats</h2>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="block w-10 h-10 bg-gray-300 rounded-full"></span>
              <span className="ml-4 font-medium">Maneesh Shukla</span>
            </div>
          </div>
        </div>
        <div className="mt-8 p-4">
          <h3 className="font-bold">Overview</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center">
              <span className="block w-6 h-6 bg-gray-300 rounded-full mr-2"></span>
              <span>Add friend</span>
            </li>
            <li className="flex items-center">
              <span className="block w-6 h-6 bg-gray-300 rounded-full mr-2"></span>
              <span>Friend requests</span>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center">
            <span className="block w-10 h-10 bg-gray-300 rounded-full"></span>
            <div className="ml-4">
              <p className="font-bold">MANEESH SHUKLA</p>
              <p className="text-sm text-gray-500">lit202304@iiitl.ac.in</p>
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
      {/* Main Content */}
      <div className="w-3/4 bg-white p-4">
        <h2 className="text-2xl font-bold">Recent chats</h2>
        <div className="mt-4">
          <div className="p-4 border rounded-md flex items-center">
            <div className="flex-shrink-0">
              <span className="block w-10 h-10 bg-gray-300 rounded-full"></span>
            </div>
            <div className="ml-4">
              <p className="font-bold">Maneesh Shukla</p>
              <p className="text-gray-500">You: How are you?</p>
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
    </div>
  );
};

export default ChatSidebar;
