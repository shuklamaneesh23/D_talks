"use client";
import React from 'react';
import { useEffect ,useState} from 'react';
import QuestionItem from '../questions/questionItem';
import SearchBar from '@/components/utils/searchBar';


function QuestionsList() {

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://d-talks-backend.vercel.app/api/v1/questions/allQuestions');
            if (!response.ok) {
                throw new Error('Failed to fetch questions.');
            }
            const data = await response.json();
            console.log("data", data);
            setQuestions(data);
            setFilteredQuestions(data); // Initialize filteredQuestions
        } catch (error) {
            console.log("Error fetching questions");
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);


    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const lowercasedQuery = query.toLowerCase();
            const filtered = questions.filter(question =>
                question.title.toLowerCase().includes(lowercasedQuery) ||
                question.content.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredQuestions(filtered);
        } else {
            setFilteredQuestions(questions);
        }
    };





    return (
        <div className="max-w-screen mx-auto p-6 bg-slate-100  shadow-md ">
        <h1 className="md:text-5xl text-3xl font-bold from-neutral-500 font-serif text-center mb-6">Question Bank</h1>
        <SearchBar onSearch={handleSearch} /> {/* Add the SearchBar component */}
            {filteredQuestions.map((question, index) => (
                <QuestionItem key={index} question={question} />
            ))}
        </div>
    );
}

export default QuestionsList;
