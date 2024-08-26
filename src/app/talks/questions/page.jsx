"use client";
import React from 'react';
import { useEffect } from 'react';
import QuestionItem from './questionItem';


function QuestionsList() {


    const [questions, setQuestions] = React.useState([]);
    //write a function to fetch questions from the backend using this api "https://d-talks-backend.vercel.app/api/v1/questions/allQuestions" --> use useEffect to call the function
    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://d-talks-backend.vercel.app/api/v1/questions/allQuestions');
            if (!response.ok) {
                throw new Error('Failed to fetch questions.');
            }
            const data = await response.json();
            console.log("data", data);
            setQuestions(data);
        }
        catch (error) {
            console.log("Error fetching questions");
        }
    }

    useEffect(() => {
        fetchQuestions();
    }, []);





    return (
        <div className="max-w-screen mx-auto p-6 mt-12 bg-slate-100  shadow-md ">
        <h1 className="md:text-5xl text-3xl font-bold from-neutral-500 font-serif text-center mb-6">Recent Doubts</h1>
            {questions.slice(0,5).map((question, index) => (
                <QuestionItem key={index} question={question} />
            ))}
        </div>
    );
}

export default QuestionsList;
