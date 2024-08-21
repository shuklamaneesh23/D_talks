/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function HeroSection() {
    return (
        <div className="flex flex-col md:flex-row items-center pt-40 justify-center bg-slate-200 p-6 md:p-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-orange-500 bg-orange-100 px-2 rounded">D</span>oubt?  <span className="text-orange-500 bg-orange-100 px-2 rounded">Talk</span> It Out!
                </h1>
                <p className="text-gray-600 text-lg md:text-xl mb-8">
                Where every doubt gets answered—experience Doubt Talk with instant solutions, AI assistance, and connect with experts in one-on-one chat.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Log in</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign up</button>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Illustration" 
                className="h-[30vh] md:h-[40vh] w-auto rounded-xl" />
            </div>
        </div>
    );
}
