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

    // Update functions to change state and localStorage
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const updateMail = (newMail) => {
        setMail(newMail);
    };

    return (
        <UserContext.Provider value={{ user, setUser: updateUser, mail, setMail: updateMail }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
