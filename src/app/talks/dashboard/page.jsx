"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import UserContext from "@/context/UserContext";
import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import { auth } from "@/lib/firebase";  // Correctly import auth
import { signOut } from "firebase/auth";



function UserDashboard() {

  const { setMail,setUid,setChatId } = useContext(UserContext);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        setMail(null);
        setUid(null);
        setChatId(null);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const { uid, mail } = useContext(UserContext);
  const id = uid;

  const [user, setUser] = useState({});
  const [reputation, setReputation] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [blogs, setBlogs] = useState([]);


  const getUserReputation = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/v1/votes/getNetVotes", {
        authorEmail: mail
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Axios automatically parses the JSON response
      const data = response.data;
      setReputation(data);
    } catch (error) {
      console.error("Error fetching reputation:", error);
    }
  }

  const questionsAsked = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/v1/votes/getQuestionsAskedByUser", {
        authorEmail: mail
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  const answersGiven = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/v1/votes/getAnswersByUser", {
        authorEmail: mail
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      setAnswers(data);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  }


  const blogsWritten = async () => {
    try {
      const response = await axios.post("http://localhost:9000/api/v1/blogs/getBlogsByAuthor", {
        authorId: id
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = response.data;
      setBlogs(data);
      setUser(data[0].authorName);
    }
    catch (error) {
      console.error("Error fetching blogs:", error);
    }

  }




  useEffect(() => {
    getUserReputation();
    questionsAsked();
    answersGiven();
    blogsWritten();
  }
    , [id]);



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {user.imageUri ? (
              <Image
                src={user.imageUri}
                alt={user.name}
                width={60}
                height={60}
                className="rounded-full"
              />
            ) : (
              <span className="w-12 h-12 bg-gray-300 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {/* Ensure user.email is a string before accessing [0] */}
                {typeof user.email === 'string' && user.email.length > 0
                  ? user.email[0].toUpperCase()
                  : ""}
              </span>
            )}
            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Card */}
        <div className="bg-white p-12 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Reputation</span>
              <span className="text-2xl font-bold">{reputation}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Posts</span>
              <span className="text-2xl font-bold">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Questions Asked</span>
              <span className="text-2xl font-bold">{questions.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Answers</span>
              <span className="text-2xl font-bold">{answers.length}</span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
          <ul className="space-y-4 flex flex-col gap-3">
            {blogs.slice(0,3).map((blog) => (
              <Link href={`/talks/blog/${blog._id}`} key={blog._id}>
              <li key={blog._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-gray-500 text-sm">
                  Posted on {new Date(blog.date).toLocaleDateString()}
                </p>
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* User Bio */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Answers</h2>
        <ul className="space-y-4 flex flex-col gap-3">
        
          {answers.slice(0,5).map((question) => (
            <Link href={`/talks/questions/${question._id}`} key={question._id}>
            <li key={question.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{question.title}</h3>
              <p className="text-gray-500 text-sm">
                Posted on {new Date(question.createdAt).toLocaleDateString()}
              </p>
            </li>
            </Link>
          ))}
          

        </ul>

      </div>
    </div>
  );
}

export default UserDashboard;
