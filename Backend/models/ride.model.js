const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
},
captain:{
type: mongoose.Schema.Types.ObjectId,
ref: 'captain',
},
pickup:{
    type: String,
    required: true,
},
destination:{
    type: String,
    required: true,
},
fare:{
    type: Number,
    required: true,
},
status:{
    type: String,
    // include 'pending' so the default value is valid
    enum: ['pending', 'requested', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
},
Duration:{
    type: Number, // in seconds
},
Distance:{
    type: Number, //im meters
},
paymentID:{
    type: String,
},
orderID:{
    type: String,
},
signature:{
    type: String,
},
otp:{
    type: String,
    select: false,
    required: true,
},
})
module.exports = mongoose.model('ride', rideSchema);