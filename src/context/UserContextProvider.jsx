"use client";
import React from "react";
import UserContext from "./UserContext";


const UserContextProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [mail, setMail] = React.useState(null);
    return(
        <UserContext.Provider value={{user, setUser,mail, setMail}}>
            {children}
        </UserContext.Provider>
    )
}   

export default UserContextProvider;