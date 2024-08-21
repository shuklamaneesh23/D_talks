"use client";
import React, { useState,useEffect,useContext } from 'react';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import UserContext from '@/context/UserContext';

export default function StackOverflowQuestionView({params}) {
    console.log("shukla",params);
    const id = params.id;
    console.log("maneesh",id);

    const { user, mail } = useContext(UserContext);
    
    console.log("user", user);
    console.log("mail",mail);
    const [question, setQuestion] = useState({
        title: '',
        content: '',
        upvotes: 0,
        downvotes: 0,
        tags: [],
        answers: []
    });

    useEffect(() => {
        const getDetailedQuestion = async () => {
            try {
                const response = await fetch(`http://localhost:9000/api/v1/questions/getQuestion/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch question.');
                }
                const data = await response.json();
                console.log("data", data);
                setQuestion(data);
            }
            catch (error) {
                console.log("Error fetching question");
            }
        }
    
        getDetailedQuestion();
    }, [id]);


    const [newAnswer, setNewAnswer] = useState('');
    const [error, setError] = useState('');

    const handleUpvote = () => {
        setQuestion({ ...question, votes: question.upvotes + 1 });
    };

    const handleDownvote = () => {
        setQuestion({ ...question, votes: question.downvotes - 1 });
    };

    const handleAnswerUpvote = (id) => {
        const updatedAnswers = question.answers.map(answer =>
            answer.id === id ? { ...answer, votes: answer.votes + 1 } : answer
        );
        setQuestion({ ...question, answers: updatedAnswers });
    };

    const handleAnswerDownvote = (id) => {
        const updatedAnswers = question.answers.map(answer =>
            answer.id === id ? { ...answer, votes: answer.votes - 1 } : answer
        );
        setQuestion({ ...question, answers: updatedAnswers });
    };

    const handleNewAnswer = async () => {
        if (!newAnswer.trim()) {
            setError('Answer cannot be empty.');
            return;
        }
 
        const newAnswerObj = {
            content: newAnswer.trim(),
            authorName: user,
            authorEmail: mail,
            upvotes: 0,
            downvotes: 0,
        };
        console.log("mshukl",id);
        console.log("newAnswerObj",newAnswerObj); 
        const response = await fetch(`http://localhost:9000/api/v1/questions/answerQuestion/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(newAnswerObj), // Serialize the object to JSON
        });
        

        if (!response.ok) {
            throw new Error('Failed to submit the answer.');
        }


        setQuestion({ ...question, answers: [...question.answers, newAnswerObj] });
        setNewAnswer('');
        setError('');
    };

    return (

        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{question.title}</h2>
            <div className="flex">
                <div className="flex flex-col items-center mr-4">
                    <button onClick={handleUpvote} className="text-gray-500 hover:text-gray-700">
                        <IconChevronUp size={24} />
                    </button>
                    <span className="text-lg font-semibold text-gray-800">{question.votes}</span>
                    <button onClick={handleDownvote} className="text-gray-500 hover:text-gray-700">
                        <IconChevronDown size={24} />
                    </button>
                </div>
                <div>
                    <p className="text-gray-700 mb-2">{question.content}</p>
                    <div className="flex space-x-2">
                        {question.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Answers</h3>
                {question.answers.map((answer) => (
                    <div key={answer._id} className="flex mb-6">
                        <div className="flex flex-col items-center mr-4">
                            <button onClick={() => handleAnswerUpvote(answer._id)} className="text-gray-500 hover:text-gray-700">
                                <IconChevronUp size={24} />
                            </button>
                            <span className="text-lg font-semibold text-gray-800">{answer.upvotes + answer.downvotes}</span>
                            <button onClick={() => handleAnswerDownvote(answer._id)} className="text-gray-500 hover:text-gray-700">
                                <IconChevronDown size={24} />
                            </button>
                        </div>
                        <div>
                            {/* <p className="text-gray-700 mb-2">{answer.content}</p> */}
                            {answer.content && (
                                <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto">
                                    <code className="text-sm text-gray-800">{answer.content}</code>
                                </pre>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Answer</h3>
                <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Enter your answer here..."
                ></textarea>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                    onClick={handleNewAnswer}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Submit Answer
                </button>
            </div>
        </div>
    );
}


