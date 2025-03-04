import mongoose from 'mongoose';
const dotenv = await import('dotenv');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB is connected`);
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
