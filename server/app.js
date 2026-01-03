import {Server } from "socket.io"
import express from "express"
//creating an instance of express
const app = express();
const PORT = process.env.PORT || 3001;
const httpServer=app.listen(PORT,() =>{
  console.log(`Server is now listening tp port ${PORT}`);
});


const io = new Server(httpServer,{
  cors:{
   origin: "*"
  }
})
//making the server listen to an event coming from client side
//event name is connection
io.on("connection",(socket) =>{
  //to console log socket id of the connected client
  console.log(`User ${socket.id} is connected`);

  //upon connection - only to current user
  socket.emit("message","Welcome to the WebSocket server");

  //upon connection - to all other users
  socket.broadcast.emit("message",`User ${socket.id.substring(0, 5)} connected`);

  //upon disconnection - to all other users
  socket.broadcast.emit("message",`User ${socket.id.substring(0, 5)} disconnected`);

  //capturing the activity event

  socket.on("activity", (name)=> {
    socket.broadcast.emit("activity",name);
  })

  //listening to message from client side
  socket.on("message",(data) => {
  console.log(data);
 //to broadcast message to all connected clients except the sender
io.emit("message",`${socket.id.substring(0, 5)}: ${data}`);
  })
})