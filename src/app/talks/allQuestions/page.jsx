"use client";
import React from 'react';
import { useEffect } from 'react';
import QuestionItem from '../questions/questionItem';


function QuestionsList() {


    const [questions, setQuestions] = React.useState([]);
    //write a function to fetch questions from the backend using this api "http://localhost:9000/api/v1/questions/allQuestions" --> use useEffect to call the function
    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:9000/api/v1/questions/allQuestions');
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
        <div className="max-w-screen mx-auto p-6 bg-slate-100  shadow-md ">
        <h1 className="md:text-5xl text-3xl font-bold from-neutral-500 font-serif text-center mb-6">Question Bank</h1>
            {questions.map((question, index) => (
                <QuestionItem key={index} question={question} />
            ))}
        </div>
    );
}

export default QuestionsList;
