import io from 'socket.io-client';

let socket = undefined;
const localIP = 'localhost';
const networkIP = '192.168.97.6';
const port = 1337;
const networkConnection = false;

function initialiseSocket() {
    const url = networkConnection ?
        `http://${networkIP}:${port}` :
        `http://${localIP}:${port}`;
    
    socket = io(url);
}

export function addEventListener(event) {
    if (!socket) {
        initialiseSocket();
    }
    socket.on(event.type, event.callback);
}

export function sendEvent(event) {
    if (!socket) {
        initialiseSocket();
    }
    socket.emit(event.type, event.data);
}
