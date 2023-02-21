let socket = io();
socket.on('connect', function() {
    console.log("socket connected")
    socket.emit('my event', {data: 'I\'m connected!'});
});
