"use client";
import React, { useState, useEffect, useContext } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import UserContext from "@/context/UserContext";
import QuestionTime from "@/components/utils/timeCalculater";
import Pusher from "pusher-js";
import Image from "next/image";
import { parseStream } from "@/lib/streaming";

export default function StackOverflowQuestionView({ params }) {
    const id = params.id;

    const { user, mail } = useContext(UserContext);
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState({
        title: "",
        content: "",
        upvotes: 0,
        downvotes: 0,
        tags: [],
        answers: [],
    });

    const getDetailedQuestion = async () => {
        try {
            const response = await fetch(
                `https://axios-week.onrender.com/api/v1/questions/getQuestion/${id}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch question.");
            }
            const data = await response.json();
            console.log("dataManeesh", data);
            setQuestion(data);
        } catch (error) {
            console.log("Error fetching question");
        }
    };

    useEffect(() => {
        getDetailedQuestion();
    }, [id]);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
            cluster: "ap2",
        });

        const channel = pusher.subscribe(`questions-${id}`);
        channel.bind("question-updated", (data) => {
            getDetailedQuestion();
        });

        return () => {
            channel.unbind_all();
            pusher.unsubscribe(`questions-${id}`);
        };
    }, [id]);

    const generateSolution = async () => {
        const sc = question.content;
        const prompt = sc + "   \n Address the given issue and explain the solution.";

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
                // Handle the streaming data
                parseStream(response, (chunk) => {
                    let a = chunk.replace(/\\n/g, "\n");
                    //console.log(a); // Log the chunk
                    setExplanation(a); // Update explanation with new chunks
                    setLoading(false);
                });
            } else {
                const errorData = await response.json();
                setError(errorData.error || "An error occurred");
            }
        } catch (error) {
            setError("An error occurred while fetching the data.");
        }
        finally {
            //setLoading(false);
        }
    };

    const [newAnswer, setNewAnswer] = useState("");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [userVoteStatus, setUserVoteStatus] = useState("none");
    const [answerVoteStatus, setAnswerVoteStatus] = useState({});

    const handleUpvote = async () => {
        const response = await fetch(
            `https://axios-week.onrender.com/api/v1/votes/upvote/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body: JSON.stringify({ mail }), // Serialize the object to JSON
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.log("Mail", mail);
            console.error("Failed to upvote the question:", errorText);
            return;
        }
        console.log("userVoteStatus", userVoteStatus);
        if (userVoteStatus === "downvoted") {
            // If previously downvoted, add 2 for the new upvote
            setQuestion({
                ...question,
                upvotes: question.upvotes + 1,
                downvotes: question.downvotes - 1,
            });
            //console.log(question.upvotes - question.downvotes);
        } else if (userVoteStatus === "none") {
            // If no previous vote, simply add 1
            setQuestion({
                ...question,
                upvotes: question.upvotes + 1,
            });
        }

        // Update user's voting status to "upvoted"
        console.log("shuklaJi setting upvoted");
        setUserVoteStatus("upvoted");
    };

    const handleDownvote = async () => {
        const response = await fetch(
            `https://axios-week.onrender.com/api/v1/votes/downvote/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body: JSON.stringify({ mail }), // Serialize the object to JSON
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            //console.log("Mail", mail);
            console.error("Failed to downvote the question:", errorText);
            return;
        }
        // Adjust downvote/upvote count based on user's previous voting status
        console.log("userVoteStatus", userVoteStatus);
        if (userVoteStatus === "upvoted") {
            // If previously upvoted, subtract 2 for the new downvote
            //setQuestion({ ...question, answers: [...question.answers, newAnswerObj] });
            setQuestion({
                ...question,
                downvotes: question.downvotes + 1,
                upvotes: question.upvotes - 1,
            });
            console.log("shuklaJi");
            console.log(question.upvotes - question.downvotes);
        } else if (userVoteStatus === "none") {
            // If no previous vote, simply add 1
            setQuestion({
                ...question,
                downvotes: question.downvotes + 1,
            });
        }

        // Update user's voting status to "downvoted"
        setUserVoteStatus("downvoted");
    };

    const handleAnswerUpvote = async (answerId) => {
        // Make an API request to handle the upvote
        const response = await fetch(
            `https://axios-week.onrender.com/api/v1/votes/upvoteAnswer/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mail, answerId }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to upvote the answer:", errorText);
            return;
        }

        // Update the vote status based on previous voting state
        const previousVoteStatus = answerVoteStatus[answerId] || "none";
        const updatedAnswers = question.answers.map((answer) => {
            if (answer.id === answerId) {
                let updatedAnswer = { ...answer };

                if (previousVoteStatus === "downvoted") {
                    // If previously downvoted, add 2 for the new upvote
                    updatedAnswer.upvotes = answer.upvotes + 1;
                    updatedAnswer.downvotes = answer.downvotes - 1;
                } else if (previousVoteStatus === "none") {
                    // If no previous vote, simply add 1
                    updatedAnswer.upvotes = answer.upvotes + 1;
                }

                return updatedAnswer;
            }

            return answer;
        });

        setQuestion({ ...question, answers: updatedAnswers });

        // Update user's voting status for this answer to "upvoted"
        setAnswerVoteStatus({ ...answerVoteStatus, [answerId]: "upvoted" });

        console.log("answerVoteStatus", answerVoteStatus);
    };

    const handleAnswerDownvote = async (answerId) => {
        // Make an API request to handle the downvote
        const response = await fetch(
            `https://axios-week.onrender.com/api/v1/votes/downvoteAnswer/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mail, answerId }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to downvote the answer:", errorText);
            return;
        }

        // Update the vote status based on previous voting state
        const previousVoteStatus = answerVoteStatus[answerId] || "none";
        const updatedAnswers = question.answers.map((answer) => {
            if (answer.id === answerId) {
                let updatedAnswer = { ...answer };

                if (previousVoteStatus === "upvoted") {
                    // If previously upvoted, subtract 2 for the new downvote
                    updatedAnswer.downvotes = answer.downvotes + 1;
                    updatedAnswer.upvotes = answer.upvotes - 1;
                } else if (previousVoteStatus === "none") {
                    // If no previous vote, simply add 1
                    updatedAnswer.downvotes = answer.downvotes + 1;
                }

                return updatedAnswer;
            }

            return answer;
        });

        setQuestion({ ...question, answers: updatedAnswers });

        // Update user's voting status for this answer to "downvoted"
        setAnswerVoteStatus({ ...answerVoteStatus, [answerId]: "downvoted" });
    };

    const handleNewAnswer = async () => {
        if (!newAnswer.trim()) {
            setError("Answer cannot be empty.");
            return;
        }

        const newAnswerObj = {
            content: newAnswer.trim(),
            code: code.trim(),
            authorName: user,
            authorEmail: mail,
            upvotes: 0,
            downvotes: 0,
        };
        if (user == null) {
            try {
                //API call to fetch username corresponding to mail with the help of this api--- "https://pg-back.vercel.app/api/users/${mail}"
                const response = await fetch(`https://pg-back.vercel.app/api/users/${mail}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                const data = await response.json();
                console.log("data", data);
                newAnswerObj.authorName = data.username;
            } catch (error) {
                formData.append("authorName", "Anonymous");
                console.log("Error fetching user data");
            }
        }
        //console.log("mshukl", id);
        //console.log("newAnswerObj", newAnswerObj);
        const response = await fetch(
            `https://axios-week.onrender.com/api/v1/questions/answerQuestion/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body: JSON.stringify(newAnswerObj), // Serialize the object to JSON
            }
        );

        if (!response.ok) {
            throw new Error("Failed to submit the answer.");
        }

        setQuestion({ ...question, answers: [...question.answers, newAnswerObj] });
        setNewAnswer("");
        setCode("");
        setError("");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pt-16">
                {question.title}
            </h2>
            <div className="flex">
                <div className="flex flex-col items-center mr-4">
                    <button
                        onClick={handleUpvote}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={!mail} // Disable button if mail is null
                    >
                        <IconChevronUp size={24} />
                    </button>
                    <span className="text-lg font-semibold text-gray-800">
                        {question.upvotes - question.downvotes}
                    </span>
                    <button
                        onClick={handleDownvote}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={!mail} // Disable button if mail is null
                    >
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
                    <div className="text-right text-sm text-gray-500 flex justify-end gap-3 items-center">
                        <p>{question.authorName}</p>
                        <QuestionTime createdAt={question.createdAt} />
                    </div>
                    {/* image of the question */}
                    {question.image && (
                        <Image
                        src={question.image}
                        className="w-full h-auto object-cover mt-4"
                        width={500}
                        height={300}
                        alt="Question Image"
                    />)}
                    <button
                        onClick={generateSolution}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        {loading ? "Generating..." : "Get Ai Generated Answer"}
                    </button>
                    {explanation && (
                        <div className="mt-4 w-full max-w-3xl p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Explanation:</h2>
                            <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto whitespace-pre-wrap">
                                <code className="text-sm text-gray-800">{explanation}</code>
                            </pre>
                        </div>
                    )}
                </div>
            </div>

            {/* code of answer */}

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Answers</h3>
                {question.answers.map((answer) => (
                    <>
                        <div key={answer._id} className="flex mb-6">
                            <div className="flex flex-col items-center mr-4">
                                <button
                                    onClick={() => handleAnswerUpvote(answer._id)}
                                    className="text-gray-500 hover:text-gray-700"
                                    disabled={!mail} // Disable button if mail is null
                                >
                                    <IconChevronUp size={24} />
                                </button>
                                <span className="text-lg font-semibold text-gray-800">
                                    {answer.upvotes - answer.downvotes}
                                </span>
                                <button
                                    onClick={() => handleAnswerDownvote(answer._id)}
                                    className="text-gray-500 hover:text-gray-700"
                                    disabled={!mail} // Disable button if mail is null
                                >
                                    <IconChevronDown size={24} />
                                </button>
                            </div>
                            <div>
                                <p className="text-gray-700 mb-2">{answer.content}</p>
                                {answer.code && (
                                    <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto">
                                        <code className="text-sm text-gray-800">{answer.code}</code>
                                    </pre>
                                )}
                            </div>
                        </div>
                        <div className="text-right text-sm text-gray-500 flex justify-end gap-3 items-center">
                            <p>{answer.authorName}</p>
                            <QuestionTime createdAt={answer.createdAt} />
                        </div>
                    </>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Your Answer
                </h3>
                <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Enter your answer here..."
                ></textarea>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Write your code here...(if any otherwise leave it blank)"
                ></textarea>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                    onClick={handleNewAnswer}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    disabled={!mail} // Disable button if mail is null
                >
                    Submit Answer
                </button>
            </div>

            {/* send button end here */}
        </div>

    );
}
