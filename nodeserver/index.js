//Node server which will handle socket io connections.
//we have made use the capital "S" inn socket instead of 'socket'
const io = require('socket.io')(8000);

const users = {};

//will listen to all the connections.And Socket.on will act as event handler
io.on('connection',socket=>{

    socket.on('new-user-joined',name =>{
        // console.log("new user joined",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    });


    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })

})
