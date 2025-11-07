const mongoose = require('mongoose');

const connectTodb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ DB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectTodb;
