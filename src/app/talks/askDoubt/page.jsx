"use client";
import React, { useState, useContext } from "react";
import { IconX } from "@tabler/icons-react";
import UserContext from "@/context/UserContext";
import { useRouter } from "next/navigation";

function QuestionForm() {
    //router for pushing to confetti
    const router = useRouter();

    //user and mail from context
    const { user, mail } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState("");

    //function to handle image change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    //function to handle tag add
    const handleTagAdd = () => {
        if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    //function to handle tag remove
    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    //function to handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!title || !content || tags.length === 0) {
            setError("Please fill out all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (user == null) {
            try {
                //API call to fetch username corresponding to mail with the help of this api--- "http://localhost:8000/api/users/${mail}"
                const response = await fetch(`http://localhost:8000/api/users/${mail}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                const data = await response.json();
                console.log("data", data);
                formData.append("authorName", data.username);
            } catch (error) {
                formData.append("authorName", "Anonymous");
                console.log("Error fetching user data");
            }
        } else {
            formData.append("authorName", user);
        }
        formData.append("authorEmail", mail);
        if (image) {
            formData.append("image", image);
        }
        tags.forEach((tag) => {
            formData.append("tags[]", tag);
        });

        // API call to submit the form data
        try {
            console.log("formData", formData.content);
            const response = await fetch("http://localhost:9000/api/v1/questions/", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("Failed to submit the question.");
            }
            // Handle success response
            router.push("/talks/success");
            //alert("Question submitted successfully!");
            setError("");
        } catch (error) {
            setError("Error submitting the question. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-900">
            <div className="w-[80vw] mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Ask a Question
                </h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Question Heading</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter a descriptive title for your question"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Complete content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Provide a detailed explanation of your question"
                            rows="6"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Attach an Image (Optional)
                        </label>
                        {/* <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 mt-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /> */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input file-input-bordered file-input-info w-full max-w-xs bg-white text-black"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Tags</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                className="w-full px-4 py-2 mt-2 border bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter a tag"
                            />
                            <button
                                type="button"
                                onClick={handleTagAdd}
                                className="px-4 py-2 mt-2 bg-blue-500  text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap mt-2 space-x-2">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="flex items-center px-2 py-1 text-sm  bg-gray-700 text-white rounded-full"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleTagRemove(tag)}
                                        className="ml-2"
                                    >
                                        <IconX size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit Question
                    </button>
                    {/* loader */}
                    {loading && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="animate-spin h-10 w-10 text-primary mx-auto mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V2.5M20 21.5a8 8 0 01-8-8V4"
                                    ></path>
                                </svg>
                                <h2 className="text-2xl font-bold mb-2 text-blue-500">Submitting...</h2>
                                <p className="text-gray-600 mb-4">
                                    Please wait while we process your request.
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default QuestionForm;
