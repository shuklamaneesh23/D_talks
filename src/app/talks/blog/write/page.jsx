"use client";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import React, { useContext, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS
import axios from 'axios';
import { toast } from 'react-toastify';
import UserContext from '@/context/UserContext';

const CreateBlogPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [tag, setTag] = useState(''); // New state for tags
    const {uid}=useContext(UserContext);
    const id=uid;
    //console.log(id);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleTagsChange = (e) => {
        setTag(e.target.value);
    };

    const handleSubmit = async(e) => {

        e.preventDefault();
        if (!title || !description || !tag) {
            alert('Please fill in all fields');
            return;
        }
        toast.info('Posting your blog post...', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: "colored",
            });

        //form data for sending req with photo since axios does not support direct image..if we want we have to send it in base64 format
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tag', tag);
        if(image) {
            formData.append('image', image);
        }
        formData.append('authorName', id);
        try{
            const response = await axios.post('https://d-talks-backend.vercel.app/api/v1/blogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
            console.log(response);
            toast.success('🦄 Posted Successfully!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "colored",
                });       

            //redirect to home page
            window.location.href = '/';

            
            }


        catch(err){
            console.log("mane");
            console.log(err);
            toast.error('Failed to create blog post');
        }

        //console.log({ title, description, image, tags });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-center p-6">
            <div className="bg-white shadow-xl rounded-lg max-w-3xl w-full p-8 space-y-6">
                <h1 className="text-4xl font-bold text-gray-800 text-center">Create New Blog Post</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold text-gray-600 mb-2">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your blog title"
                            required
                        />
                    </div>
                    <div className='pb-12'>
                        <label className="block text-lg font-semibold text-gray-600 mb-2">Description</label>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            className="h-64"
                            placeholder="Write your blog content here..."
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-600 mb-2">Tags</label>
                        <input
                            type="text"
                            value={tag}
                            onChange={handleTagsChange}
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Add tags separated by commas"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-600 mb-2">Upload Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                            accept="image/*"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                    >
                        Publish Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPost;
