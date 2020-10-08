// Create server
let port = process.env.PORT || 8000;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

// Tell server where to look for files
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/player'));

// Create socket connection
let io = require('socket.io').listen(server);

// Listen for individual clients to connect
io.sockets.on('connection',
  function (socket) {
     socket.on('dataurl', function(data) {
       console.log('data')
      io.sockets.emit('dataurl', data)
    });
    
  })