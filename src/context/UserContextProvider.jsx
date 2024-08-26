"use client";
import React, { useCallback, useEffect } from "react";
import UserContext from "./UserContext";
import {io,Socket} from "socket.io-client";
import { set } from "mongoose";
import Peer from 'simple-peer';

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

    const [socket, setSocket] = React.useState(null);
    const [isSocketConnected, setIsSocketConnected] = React.useState(false);
    const [onlineUsers, setOnlineUsers] = React.useState([]);
    const [ongoingCall, setOngoingCall] = React.useState(null);
    const [localStream, setLocalStream] = React.useState(null);
    const [peer, setPeer] = React.useState(null);

    const currentSocketUser=onlineUsers?.find(u=>u.userId===user);
    
    console.log("currentSocketUser", currentSocketUser);
    console.log("userH", user);

    const getMediaStream=useCallback(async(faceMode)=>{
        if(localStream) return localStream;

        try {
            const devices= await navigator.mediaDevices.enumerateDevices();
            const vedioDevices=devices.filter(device=>device.kind==='videoinput');

            const stream=await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:{
                    width:{min:640,ideal:1280,max:1920},
                    height:{min:360,ideal:720,max:1080},
                    frameRate:{min:16,ideal:30,max:30},
                    facingMode:vedioDevices.length>0 ? faceMode:undefined,
                }
            });
            setLocalStream(stream);
            return stream;
        } catch (error) {
            console.error("Error accessing media devices.",error);
            setLocalStream(null);
            return null;
            
        }

    },[localStream])

    
    const handleCall= useCallback(async(user)=>{
        if(!currentSocketUser || !socket) return;

        const stream=await getMediaStream();

        if(!stream){
            console.error("No stream in handle call");
             return;
        }

        const participants={caller:currentSocketUser,receiver:user};
        setOngoingCall({
            participants,
            isRinging:false
        });
        socket.emit('call',participants);
        console.log("setting",participants);
    },[socket,currentSocketUser,ongoingCall])

    const onIncomingCall=useCallback((participants)=>{
        //if(!currentSocketUser || !socket) return;

        setOngoingCall({
            participants,
            isRinging:true
        });
        console.log("setted true",participants);
    },[socket,user,ongoingCall])


    console.log("onlineUsers", onlineUsers);

    const createPeer=useCallback((stream,initiator)=>{
        const iceServers=[
            {
                urls:[
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun3.l.google.com:19302',
                ]
            }
        ];

        const peer= new Peer({
            stream,
            initiator,
            trickle:true,
            config:{
                iceServers
            }
        })

        peer.on('stream',(stream)=>{
            setPeer((prevPeer)=>{
                if(prevPeer){
                    return {...prevPeer,stream}
                }
                return prevPeer;
            })
    })

        peer.on('error',console.error);
        peer.on('close',()=> handleHangup({}));

        const rtcPeerCoonection=(peer)._pc;

        rtcPeerCoonection.oniceconnectionstatechange=async()=>{
            if(rtcPeerCoonection.iceConnectionState==='disconnected' || rtcPeerCoonection.iceConnectionState==='failed'){
                handleHangup({});
            }
        }

        return peer;

    },[ongoingCall,setPeer])

    const completePeerConnection=useCallback(async(connectionData)=>{

        if(!localStream){
            console.error("No local stream in complete peer connection");
            return;
        }

        if(peer){
            peer.peerConnection.signal(connectionData.sdp);
            return;
        }

        const newPeer=createPeer(localStream,true);
        setPeer({
            peerConnection:newPeer,
            participantUser:connectionData.ongoingCall.participants.receiver,
            stream:undefined
        })

        newPeer.on('signal',async(data)=>{
            if(socket){
                socket.emit('webrtcSignal',{
                    sdp:data,
                    ongoingCall,
                    isCaller:true
                });
            }
        });

    },[localStream,createPeer,peer,ongoingCall])

    const handleHangup=useCallback(({})=>{},[])
//creatign peer
   

    const handleJoinCall=useCallback(async(ongoingCall)=>{
        //console.log("joining call",ongoingCall);
        setOngoingCall(prev=>{
            if(prev){
                return {...prev,isRinging:false}
            }
            return prev;
        })

        const stream=await getMediaStream();
        if(!stream){
            console.error("No stream in handle call");
                return;
        }

        const newPeer=createPeer(stream,true);
        setPeer({
            peerConnection:newPeer,
            participantUser:ongoingCall.participants.caller,
            stream:undefined
        })

        newPeer.on('signal',async(data)=>{
            if(socket){
                socket.emit('webrtcSignal',{
                    sdp:data,
                    ongoingCall,
                    isCaller:false
                });
            }
        });

    },[socket,currentSocketUser])


    useEffect(() => {
        const newSocket=io()
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }
    ,[user])

    useEffect(() => {
        if(socket===null) return;

        if(socket.connected){
            onConnect()
        }

        function onConnect(){
            setIsSocketConnected(true)
        }

        function onDisconnect(){
            setIsSocketConnected(false)
        }

        socket.on('connect',onConnect)
        socket.on('disconnect',onDisconnect)

        return () => {
            socket.off('connect',onConnect)
            socket.off('disconnect',onDisconnect)
        }
    }
    ,[socket])



    useEffect(() => {
        
        if(!socket || !isSocketConnected) return;

        socket.emit('addNewUser', user)
        socket.on('getUsers',(res)=>{
            setOnlineUsers(res)
        })

        console.log("User added to socket", user);
        return () => {
            socket.off('getUsers');
        }
    }
    ,[socket,isSocketConnected,user])


    useEffect(() => {
        if(!socket || !isSocketConnected) return;

        socket.on('incomingCall',onIncomingCall)
        socket.on('webrtcSignal',completePeerConnection)

        return () => {
            socket.off('incomingCall',onIncomingCall)
        }
    },[socket,isSocketConnected,user,onIncomingCall])



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
        <UserContext.Provider value={{ user, setUser: updateUser, mail, setMail: updateMail,uid, setUid: updateUid,chatId,setChatId:updateChatId,onlineUsers,setOnlineUsers,handleCall,ongoingCall,localStream,handleJoinCall }}>
            {children}
        </UserContext.Provider>
    );
}
 
export default UserContextProvider;
