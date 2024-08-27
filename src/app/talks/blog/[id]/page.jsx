"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import formatDate from "@/components/utils/formatDate";
import { parseStream } from "@/lib/streaming";
import DOMPurify from 'dompurify';

function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(1, maxWords).join(" ") + "...";
    }
    return text;
}

export default function Home({ params }) {
    const [mainPost, setMainPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const id = params.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mainPostRes = await axios.get(`https://d-talks-backend.vercel.app/api/v1/blogs/${id}`);
                setMainPost(mainPostRes.data);

                const allPostsRes = await axios.get('https://d-talks-backend.vercel.app/api/v1/blogs');
                const allPosts = allPostsRes.data;
                setPosts(allPosts.filter(post => post._id !== id).slice(0, 3));
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id]);

    const generateSolution = async () => {
        const prompt = mainPost?.description + "   \n Give me a brief summary of the above blog content.";

        if (!prompt) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/generateSolution", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            if (response.ok) {
                parseStream(response, (chunk) => {
                    let a = chunk.replace(/\\n/g, "\n");
                    //console.log(a);
                    setExplanation(a);
                });
            } else {
                const errorData = await response.json();
                setError(errorData.error || "An error occurred");
            }
        } catch (error) {
            setError("An error occurred while fetching the data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-200 text-white">
            <main className="px-5 py-10">
                {mainPost && (
                    <div className="bg-slate-200 p-5 rounded-lg mb-10">
                        <Image
                            src={mainPost.image}
                            alt="Blog main image"
                            width={1200}
                            height={500}
                            className="w-full h-96 object-cover rounded-md mb-4"
                        />

                        <div className="md:p-12 ml-4 mr-4 md:ml-28 md:mr-28">
                            <span className="block text-xl text-slate-800 mb-4">
                                {mainPost.tag} | {formatDate(mainPost.date)}
                            </span>
                            <span className="flex justify-end text-xl text-slate-800 mb-4">
                            Published By | {mainPost.authorName.name}
                            </span>
                            <h1 className="text-4xl text-black font-bold mb-4">
                                {mainPost.title}
                            </h1>
                            <pre
                                className="text-gray-600 whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mainPost.description) }}
                            />

                            <button
                                onClick={generateSolution}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                {loading ? "Summarising..." : "Summarise using Gemini"}
                            </button>
                            {explanation && (
                                <div className="mt-4 w-full max-w-3xl p-4 rounded-lg shadow-md">
                                    <h2 className="text-xl text-black font-semibold mb-2">Explanation:</h2>
                                    <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto whitespace-pre-wrap">
                                        <code className="text-sm text-gray-800">{explanation}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex justify-between p-4">
                    <div>
                        <h2 className="text-3xl text-red-600 font-bold mb-4">Related News</h2>
                    </div>
                    <div>
                        <Link href="/talks/blog">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Read More
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div key={index} className="relative p-5 rounded-lg">
                            <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-blur-md rounded-md"></div>
                            <div className="relative z-10">
                                <Image
                                    src={post.image}
                                    alt="Blog image"
                                    width={400}
                                    height={300}
                                    className="w-full h-58 object-cover rounded-md mb-4"
                                />
                                <div className="space-y-2">
                                    <span className="block text-sm text-slate-800">
                                        {post.tag} | {formatDate(post.date)}
                                    </span>
                                    <h2 className="text-2xl text-black font-semibold">{post.title}</h2>
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
