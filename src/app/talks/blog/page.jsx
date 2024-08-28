"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import formatDate from "@/components/utils/formatDate";
import UserContext from "@/context/UserContext";
import { useContext, useState, useEffect } from "react";

function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
}

export default function Home() {
    const { mail } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(
                    "https://axios-week.onrender.com/api/v1/blogs"
                );
                setPosts(res.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-200">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-200">
                <p className="text-xl font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    const [firstPost, ...otherPosts] = posts;

    return (
        <div className="min-h-screen bg-slate-200 text-black">
            <header>
                <div className="relative">
                    <div className="flex justify-end p-6">
                        <Link href="/talks/blog/write">
                            <button
                                className={`${mail
                                        ? "bg-red-500 hover:bg-red-700"
                                        : "bg-gray-400 cursor-not-allowed"
                                    } text-white font-bold py-2 px-4 rounded`}
                                disabled={!mail}
                            >
                                Write Blog
                            </button>
                        </Link>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-16">
                        <h1 className="text-5xl font-bold mb-2">Recent Blogs</h1>
                        <div className="mb-2">
                            <hr className="w-20 border-t-2 border-black mb-1" />
                            <hr className="w-20 border-t-2 border-black" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Post */}
            {firstPost && (
                <div className="relative p-5 rounded-lg flex flex-col md:flex-row md:p-12 m-12 mt-20 bg-white shadow-lg">
                    <div className="relative z-10 flex flex-col md:flex-row">
                        <Image
                            src={firstPost.image}
                            alt={firstPost.title}
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover rounded-md mb-5 md:mb-0 md:mr-5"
                        />
                        <div className="flex flex-col justify-between mt-4 md:mt-0">
                            <div>
                                <span className="block font-mono font-semibold text-2xl text-slate-800 mb-4">
                                    {firstPost.tag} | {formatDate(firstPost.date)}
                                </span>
                                <h2 className="text-4xl font-semibold mb-4">
                                    {firstPost.title}
                                </h2>
                                <p className="text-xl text-gray-600 mb-4">
                                    {truncateText(firstPost.description, 40)}
                                </p>
                            </div>
                            <Link href={`/talks/blog/${firstPost._id}`}>
                                <span className="text-blue-500 hover:underline text-lg">
                                    Read More &rarr;
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Other Posts Grid */}
            <main className="px-5 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map((post) => (
                        <div
                            key={post._id}
                            className="relative p-5 rounded-lg shadow-lg bg-white"
                        >
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={400}
                                height={250}
                                className="w-full h-auto object-cover rounded-md mb-4"
                            />
                            <div className="space-y-2">
                                <span className="block text-sm text-slate-800">
                                    {post.tag} | {formatDate(post.date)}
                                </span>
                                <h2 className="text-2xl font-semibold">{post.title}</h2>
                                <p className="text-gray-600">
                                    {truncateText(post.description, 20)}
                                </p>
                                <Link href={`/talks/blog/${post._id}`}>
                                    <span className="text-blue-500 hover:underline">
                                        Read More &rarr;
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
