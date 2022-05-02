// const express = require('express');
// const http = require('http').Server(express);
// const socketio = require('socket.io')(http, { pingTimeout: 60000 });
// const port = 8080;

// socketio.on('connection', (socket) => {
//     console.log('socketio')
//     // new socket connected

//     // listen for a 'departments' event
//     socket.on('departments', (departments) => {
//         console.log('departments')
//         // send the message back to the client
//         socket.emit('departments', departments);
//     });
// });

// http.listen(port, () => {
//   console.log('Server started on port', port);
// });

const express = require('express');
const http = require('http').Server(express);
const socketio = require('socket.io')(http, { pingTimeout: 60000 });
const port = 1337;

socketio.on('connection', (socket) => {
    console.log('connection-socketio')
    // new socket connected
  
    // listen for a 'message' event
    socket.on('departments', (eventData) => {
        // attach the current time
        //eventData.processed = Date.now();
    
        // send the message back to the client
        socket.emit('departments', eventData);
    })
})

http.listen(port, () => {
    console.log('Server started on port', port);
});