import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb');
    console.log(`MongoDB is connected`);
  } catch (error) {
    console.error(error.message);
  }
};
export default connectDB;
