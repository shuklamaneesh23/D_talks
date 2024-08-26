import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import onCall from "./src/components/utils/onCall.js";
import onWebrtcSignal from "./src/components/utils/onWebrtcSignal.js";






const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

console.log("Starting server...");

export let io;

app.prepare().then(() => {

    const httpServer = createServer(handler);

    io = new Server(httpServer);

    let onlineUsers=[]

    io.on("connection", (socket) => {
        socket.on('addNewUser', (uid) => {
            console.log("User added to socketC", uid);
            if (uid && !onlineUsers.some(existingUser => existingUser === uid)) {
                onlineUsers.push({
                    userId: uid,
                    socketId: socket.id,
                    profile: uid // This could include additional information like displayName, photoURL, etc.
                });
                io.emit('getUsers', onlineUsers);
            }
        });
               

        socket.on('disconnect', () => {
            onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
            io.emit('getUsers', onlineUsers);
        }
        );
        // ...

        //call events
        socket.on('call',onCall);
        socket.on('webrtcSignal',onWebrtcSignal);

        socket.on('hangup', (participants) => {
            const { caller, receiver } = participants;
            if (caller.socketId) {
                io.to(caller.socketId).emit('hangup');
            }
            if (receiver.socketId) {
                io.to(receiver.socketId).emit('hangup');
            }
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});