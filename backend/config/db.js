const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('database connected');
  } catch (error) {
    console.log('Error connecting database');
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
