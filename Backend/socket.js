const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


 socket.on('join', async (data) => {
  const { userId, userType } = data;

  if (userType === 'user') {
    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
    console.log(`User ${userId} joined -> ${socket.id}`);
  } else if (userType === 'captain') {
    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
    const updatedCaptain = await captainModel.findById(userId);
    console.log(`✅ Captain ${userId} joined with socket id ${socket.id}`);
    console.log("🧠 DB stored socketId:", updatedCaptain?.socketId);
  }
});



        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}
// done here
// const sendMessageToSocketId = (socketId, messageObject) => {

// console.log(messageObject);

//     if (io) {
//         io.to(socketId).emit(messageObject.event, messageObject.data);
//     } else {
//         console.log('Socket.io not initialized.');
//     }
// }

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log("📨 Attempting to send:", messageObject.event, "to:", socketId);

  if (io && socketId) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log(`✅ Emitted '${messageObject.event}' to ${socketId}`);
  } else {
    console.log(`⚠️ Cannot emit '${messageObject.event}' — missing socketId or io`);
  }
};


module.exports = { initializeSocket, sendMessageToSocketId };