"use client";
import { useEffect, useState } from 'react';

// Sample Data
const sampleUserData = {
  name: "John Doe",
  photoURL: "https://randomuser.me/api/portraits/men/1.jpg",
  email: "johndoe@example.com",
  points: 250,
  questionsAsked: [
    "questionId1",
    "questionId2",
  ],
  answersGiven: [
    "questionId3",
    "questionId4",
  ],
};

const sampleQuestions = {
  questionId1: {
    id: "questionId1",
    title: "How to center a div using CSS?",
  },
  questionId2: {
    id: "questionId2",
    title: "What is the difference between let and var in JavaScript?",
  },
  questionId3: {
    id: "questionId3",
    title: "How do I optimize a SQL query with multiple joins?",
  },
  questionId4: {
    id: "questionId4",
    title: "What is the time complexity of binary search?",
  },
};

// Simulate fetching data from a database
const fetchUserData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleUserData);
    }, 500);
  });
};

const fetchQuestions = async (questionIds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = questionIds.map(id => sampleQuestions[id]);
      resolve(questions);
    }, 500);
  });
};

// Dashboard Component
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [questionsAsked, setQuestionsAsked] = useState([]);
  const [answersGiven, setAnswersGiven] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUser(userData);

      const questionsAskedData = await fetchQuestions(userData.questionsAsked);
      const answersGivenData = await fetchQuestions(userData.answersGiven);

      setQuestionsAsked(questionsAskedData);
      setAnswersGiven(answersGivenData);
    };
    
    fetchData();
  }, []);
  
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
          <img src={user.photoURL} alt="User Photo" className="w-20 h-20 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-800 font-bold">Points: {user.points}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Questions Asked</h3>
        <ul className="list-disc pl-5">
          {questionsAsked.map((q, idx) => (
            <li key={idx}>
              <a href={`/question/${q.id}`} className="text-blue-600 hover:underline">
                {q.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Answers Given</h3>
        <ul className="list-disc pl-5">
          {answersGiven.map((q, idx) => (
            <li key={idx}>
              <a href={`/question/${q.id}`} className="text-blue-600 hover:underline">
                {q.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
