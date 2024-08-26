"use client";
import Link from "next/link";
import React from "react";
import UserContext from "@/context/UserContext";
import { auth } from "@/lib/firebase";  // Correctly import auth
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { setMail,mail } = React.useContext(UserContext);
  const router = useRouter();
 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        setMail(null);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };


  return (
    <div className="navbar w-[96%] bg-slate-500 fixed z-20 text-black rounded-2xl m-[2%]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-200 rounded-box w-52"
          >
            <Link href="/talks/blog">
              <li>Blogs</li>
            </Link>
            <li>
              <a>Learn</a>
              <ul className="p-2 bg-slate-200">
                <Link href="/#black">
                  <li>How to use?</li>
                </Link>
                <Link href="">
                  <li>Features</li>
                </Link>
              </ul>
            </li>
            <Link href="/talks/chat">
              <li>Chat</li>
            </Link>
            <Link href="/talks/askDoubt">
              <li>Ask Doubt</li>
            </Link>
            <Link href="/talks/dashboard">
              <li>DashBoard</li>
            </Link>
          </ul>
        </div>
        <Link className="btn btn-ghost text-2xl" href="/">
          D-Talks
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/talks/blog">Blogs</Link>
          </li>
          <li>
            <details>
              <summary>Learn</summary>
              <ul className="p-2 bg-white">
                <li>
                  <Link href="/#black">How to use?</Link>
                </li>
                <li>
                  <Link href="/talks/allQuestion">Question Bank</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/talks/chat">Chat</Link>
          </li>
          <li>
            <Link href="/talks/askDoubt">Ask Doubt</Link>
          </li>
          <li>
          <Link href="/talks/dashboard">
              DashBoard
            </Link>
            </li>
        </ul>
      </div>
      {/* login button here */}
      <div className="navbar-end"></div>
      <div className="ml-4">
        {mail ? (
          <button
            onClick={handleSignOut}
            className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg blur-lg opacity-50 transition-transform transform group-hover:scale-110" />
            <span className="relative">Logout</span>
          </button>
        ) : (
          <Link href="/talks/login">
            <button className="relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg blur-lg opacity-50 transition-transform transform group-hover:scale-110" />
              <span className="relative">Login</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
