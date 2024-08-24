/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function HeroSection() {
    return (
        <div className="flex flex-col md:flex-row items-center pt-32 md:pt-40 justify-center bg-slate-100 p-6 md:p-12">
            <div className="text-center md:text-left mb-6 md:mb-0 max-w-md md:max-w-lg">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                    <span className="text-orange-500 bg-orange-100 px-2 rounded">D</span>oubt? 
                    <span className="text-orange-500 bg-orange-100 px-2 rounded"> Talk</span> It Out!
                </h1>
                <p className="text-gray-700 text-lg md:text-2xl mb-8">
                    Where every doubt gets answered—experience Doubt Talk with instant solutions, AI assistance, and connect with experts in one-on-one chat.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                <Link href="/talks/login">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Log in
                    </button>
                </Link>
                <Link href="/talks/login">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Sign up
                    </button>
                </Link>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
                <img 
                    src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Discussion illustration" 
                    className="h-[30vh] md:h-[50vh] w-auto rounded-xl shadow-lg"
                />
            </div>
        </div>
    );
}
