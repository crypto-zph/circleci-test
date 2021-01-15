const { io }        = require('./server');
const WSController  = require('./controllers/WSController');

io.on('connect', (socket) => {
    console.log('websocket connection established!');
    // socket.on('dummy', WSController.dummy);
    // socket.on('sendItemComment', WSController.sendItemComment);
    socket.on('wsAddPostComment', WSController.addPostComment);
})