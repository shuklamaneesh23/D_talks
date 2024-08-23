export default function Chat() {
    return (
        <>
            <div className="w-3/4 bg-yellow-500 p-4">
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
        </>
    )
}



