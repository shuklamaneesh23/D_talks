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

export default async function Home() {
    const res = await axios.get('http://localhost:9000/api/v1/blogs');
    const posts = await res.data;
    console.log("posts");
    console.log(posts[0].image);

    // Destructure the first post and the rest of the posts
    const [firstPost, ...otherPosts] = posts;

    return (
        <div className="min-h-screen bg-black text-white">
            <header>
                <div className="relative">
                    <div
                        className="bg-cover bg-center w-full h-72 mb-4"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-4xl font-bold mb-2">Recent Blogs</h1>
                        <div className="mb-2">
                            <hr className="w-[8vw] bg-red-500 mb-2" />
                            <hr className="w-[8vw] bg-red-500 mb-2" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Solo card */}
            {firstPost && (
                <div className="bg-black p-5 rounded-lg flex flex-col md:flex-row md:p-12">
                    <Image
                        src={firstPost.image}
                        alt="Blog image"
                        width={400} // Adjust the width as needed
                        height={200} // Adjust the height as needed
                        className="w-[90vw] h-[50vh] md:w-[90vw] md:h-[50vh] object-cover rounded-md mb-5 md:mb-0 md:mr-5"
                    />
                    <div className="flex flex-col justify-between mt-16 mb-16">
                        <div>
                            <span className="block text-xl text-orange-500 mb-8">
                                {firstPost.tag} | {firstPost.date}
                            </span>
                            <h2 className="text-4xl font-semibold">{firstPost.title}</h2>
                            <p className="text-2xl text-gray-400">
                                {truncateText(firstPost.description, 40)}
                            </p>
                        </div>
                        <Link href={`/talks/blog/${firstPost._id}`}>
                            <span className="text-orange-500 hover:underline">
                                Read More
                            </span>
                        </Link>
                    </div>
                </div>
            )}

            {/* Grid of cards */}
            <main className="px-5 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts && otherPosts.map((post, index) => (
                        <div key={index} className="bg-black p-5 rounded-lg">
                            <Image
                                src={post.image}
                                alt="Blog image"
                                width={400} // Set the width as needed
                                height={300} // Set the height as needed
                                className="w-full h-58 object-cover rounded-md mb-4"
                            />
                            <div className="space-y-2">
                                <span className="block text-sm text-orange-500">
                                    Technology | {post.date}
                                </span>
                                <h2 className="text-2xl font-semibold">{post.title}</h2>
                                <p className="text-gray-400">{truncateText(post.description, 20)}</p>
                                <Link href={`/talks/blog/${post._id}`}>
                                    <span className="text-orange-500 hover:underline">
                                        Read More
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
