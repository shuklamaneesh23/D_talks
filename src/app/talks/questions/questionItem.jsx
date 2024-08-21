import React from 'react';

function QuestionItem({ question }) {
    return (
        <div className="border-b border-gray-300 py-4 bg-white">
            <div className="flex justify-between">
                <div className="md:flex md:flex-row flex-col space-x-4 ">
                    <div className="text-center text-black flex md:flex-col md:justify-center pl-4 md:pl-0 justify-start gap-6 md:gap-0">
                        <p className="text-sm font-semibold whitespace-nowrap">
                            {question.votes} votes
                        </p>
                        <p className="text-sm whitespace-nowrap">
                            {question.answers} answers
                        </p>
                    </div>
                    <div>
                        <a href="#" className="text-blue-600 text-lg hover:underline">{question.title}</a>
                        <p className="text-gray-600">{question.description}</p>
                        <div className='md:flex md:flex-row flex-col justify-between items-center'>
                            <div className="flex space-x-2 mt-2">
                                {question.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">{tag}</span>
                                ))}
                            </div>
                            <div className="text-right text-sm text-gray-500 flex  justify-end gap-3 items-center">
                                <p>{question.author}</p>
                                <p>{question.time}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionItem;
