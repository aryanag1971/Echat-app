const port=process.env.PORT||8000
const io=require("socket.io")(port);
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]}); 
    });
    socket.on('disconnect',message=>{
        var name=users[socket.id];
        socket.broadcast.emit('left',name);
        delete users[socket.id];
    });


});
// const express=require("express");
// const app=express();
// const http=require 

// const PORT=process.env.PORT || 3000;
// app.get("/",function(req,res){
//     res.send("hello");
// });

