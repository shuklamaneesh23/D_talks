"use client";
import React, { useEffect } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [user, setUser] = React.useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [mail, setMail] = React.useState(() => {
        const storedMail = localStorage.getItem('mail');
        return storedMail ? JSON.parse(storedMail) : null;
    });

    const [uid, setUid] = React.useState(() => {
        const storedUid = localStorage.getItem('uid');
        return storedUid ? JSON.parse(storedUid) : null;
    }
    );

    const [chatId, setChatId] = React.useState(() => {
        const storedChatId = localStorage.getItem('chatId');
        return storedChatId ? JSON.parse(storedChatId) : null;
    }
    );



    // Effect to update localStorage when user or mail changes
    useEffect(() => {
        if (user !== null) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (mail !== null) {
            localStorage.setItem('mail', JSON.stringify(mail));
        } else {
            localStorage.removeItem('mail');
        }
    }, [mail]);

    useEffect(() => {
        if (uid !== null) {
            localStorage.setItem('uid', JSON.stringify(uid));
        } else {
            localStorage.removeItem('uid');
        }
    }, [uid]);

    useEffect(() => {
        if (chatId !== null) {
            localStorage.setItem('chatId', JSON.stringify(chatId));
        } else {
            localStorage.removeItem('chatId');
        }
    }
    , [chatId]);



    // Update functions to change state and localStorage
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const updateMail = (newMail) => {
        setMail(newMail);
    };

    const updateUid = (newUid) => {
        setUid(newUid);
    };

    const updateChatId = (newChatId) => {
        setChatId(newChatId);
    };



    return (
        <UserContext.Provider value={{ user, setUser: updateUser, mail, setMail: updateMail,uid, setUid: updateUid,chatId,setChatId:updateChatId }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
