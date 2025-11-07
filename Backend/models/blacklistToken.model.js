const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24 hours in seconds
  },
});

// Use existing model if it exists, otherwise create it
module.exports =
  mongoose.models.BlacklistToken ||
  mongoose.model('BlacklistToken', blacklistTokenSchema);
