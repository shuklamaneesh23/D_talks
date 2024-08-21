"use client";
import React from 'react';
import { useEffect } from 'react';
import QuestionItem from './questionItem';


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
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-white shadow-md rounded-lg">
            {questions.map((question, index) => (
                <QuestionItem key={index} question={question} />
            ))}
        </div>
    );
}

export default QuestionsList;
