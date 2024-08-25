import axios from "axios";
import Image from "next/image";
import Link from "next/link";


function truncateText(text, maxWords) {
    const words = text.split(" ");
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
}


export default async function Home({ params }) {
    const id = params.id;
    console.log("id", id);
    const res = await axios.get(`http://localhost:9000/api/v1/blogs/${id}`);
    const mainPost = await res.data;


    const response = await axios.get('http://localhost:9000/api/v1/blogs');
    const allPosts = await response.data;
    console.log("allPosts", allPosts);
    const posts = allPosts.filter(post => post._id !== mainPost._id).slice(0, 3);

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
                            <span className="block text-xl text-slate-800 mb-8">
                                Technology | {mainPost.date}
                            </span>
                            <h1 className="text-4xl text-black font-bold mb-4">
                                {mainPost.title}
                            </h1>
                            <pre className="text-gray-600 whitespace-pre-wrap">
                                {mainPost.description}
                            </pre>

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
                    {posts && posts.map((post, index) => (
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
                                        Technology | {post.date}
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
