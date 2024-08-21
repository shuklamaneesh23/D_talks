import React from 'react';
import QuestionItem from './questionItem';

const questions = [
    {
        title: "chrome version Version 127.0.6533.120 (Official Build) (64-bit) WebDriver issue",
        description: "SO i have the chrome version Version 127.0.6533.120 (Official Build) (64-bit). I need to use the webdriver...",
        tags: ["python", "selenium-webdriver"],
        votes: 0,
        answers: 0,
        views: 2,
        author: "marcus pauly",
        time: "51 secs ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Create custom QML PdfStyle",
        description: "I'm developing an application (pdf reader) in QT/QML using PdfMultiPageView control and Qt.Pdf library...",
        tags: ["pdf", "qml"],
        votes: 1,
        answers: 0,
        views: 3,
        author: "Matteo Giampaoli",
        time: "2 mins ago",
    },
    {
        title: "Github Actions uses system ruby instead of rbenv version",
        description: "This actions runs fastlane on a macstadium runner, rbenv is setup to use 2.7.x but github action...",
        tags: ["react-native", "github-actions", "rbenv"],
        votes: 0,
        answers: 0,
        views: 4,
        author: "Olivier",
        time: "2 mins ago",
    },
    // Add more questions as needed
];

function QuestionsList() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-white shadow-md rounded-lg">
            {questions.map((question, index) => (
                <QuestionItem key={index} question={question} />
            ))}
        </div>
    );
}

export default QuestionsList;
