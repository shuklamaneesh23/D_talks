"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import formatDate from "@/components/utils/formatDate";
import UserContext from "@/context/UserContext";
import { useContext,useState,useEffect } from "react";

function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(1, maxWords).join(" ") + "...";
    }
    return text;
}



export default function Home() {

    const { mail } = useContext(UserContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:9000/api/v1/blogs');
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    if (!posts.length) {
        return <div>Loading...</div>;
    }

    const [firstPost, ...otherPosts] = posts;

    return (
        <div className="min-h-screen bg-slate-200 text-black">
            <header>
                <div className="relative">
                    <div className="flex justify-end p-6">
                    <Link href="/talks/blog/write">
            <button 
                className={`${
                    mail ? "bg-red-500 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={!mail}
            >
                Write Blog
            </button>
        </Link>
                    </div>
                    <div
                        className="bg-cover bg-center w-full h-48 mb-4"
                    />
                    <div className="absolute mt-20 inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-5xl font-bold mb-2">Recent Blogs</h1>
                        <div className="mb-2 bg-black">
                            <hr className="w-[8vw] bg-black mb-1" />
                            <hr className="w-[8vw] bg-black mb-1" />
                        </div>
                    </div>

                </div>
            </header>

            {/* Solo card */}
            {firstPost && (
                <div className="relative p-5 rounded-lg flex flex-col md:flex-row md:p-12 m-12 mt-2">
                    {/* Background layer */}
                    <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-lg rounded-md"></div>

                    {/* Content layer */}
                    <div className="relative z-10 flex flex-col md:flex-row">
                        <Image
                            src={firstPost.image}
                            alt="Blog image"
                            width={400} // Adjust the width as needed
                            height={200} // Adjust the height as needed
                            className="w-[50vw] h-[50vh] md:w-[50vw] md:h-[50vh] object-cover rounded-md mb-5 md:mb-0 md:mr-5"
                        />
                        <div className="flex flex-col justify-between mt-16 mb-16">
                            <div>
                                <span className="block font-mono font-semibold text-2xl text-slate-800 mb-8">
                                    {firstPost.tag} | {formatDate(firstPost.date)}
                                </span>
                                <h2 className="text-4xl font-semibold">{firstPost.title}</h2>
                                <p className="text-xl text-gray-400">
                                    {truncateText(firstPost.description, 20)}
                                </p>
                            </div>
                            <Link href={`/talks/blog/${firstPost._id}`}>
                                <span className="text-blue-500 hover:underline">
                                    Read More
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}




            {/* Grid of cards */}
            <main className="px-5 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts && otherPosts.map((post, index) => (
                        <div key={index} className="relative p-5 rounded-lg">
                            {/* Background layer */}
                            <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md rounded-md"></div>

                            {/* Content layer */}
                            <div className="relative z-10">
                                <Image
                                    src={post.image}
                                    alt="Blog image"
                                    width={400} // Set the width as needed
                                    height={300} // Set the height as needed
                                    className="w-full h-58 object-cover rounded-md mb-4"
                                />
                                <div className="space-y-2">
                                    <span className="block text-sm text-slate-800">
                                        {post.tag} | {formatDate(post.date)}
                                    </span>
                                    <h2 className="text-2xl font-semibold">{post.title}</h2>
                                    <p className="text-gray-400">{truncateText(post.description, 20)}</p>
                                    <Link href={`/talks/blog/${post._id}`}>
                                        <span className="text-blue-500 hover:underline">
                                            Read More
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
