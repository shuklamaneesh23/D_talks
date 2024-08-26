"use client";
import UserContext from "@/context/UserContext";
import { useContext } from "react";

const CallNotification = () => {
    const { ongoingCall,handleJoinCall } = useContext(UserContext);

    if(!ongoingCall?.isRinging) {
        console.log("ongoingCall>>",ongoingCall);
        return;
    }
    console.log("ongoingCall",ongoingCall);
    return(
        <div className="fixed bg-slate-500 w-screen h-screen">
        
            someone is calling

            <button 
            onClick={()=>handleJoinCall(ongoingCall)}
             className="btn btn-primary">Accept</button>
            <button className="btn btn-warning">Reject</button>
            
        </div>
    )

}

export default CallNotification;