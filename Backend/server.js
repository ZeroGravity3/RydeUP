const express = require('express');
const http = require('http');
const { initializeSocket } = require('./socket');

const app = express(); 
const server = http.createServer(app);

const port = process.env.PORT || 4000;

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


