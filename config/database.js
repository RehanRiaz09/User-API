// import mongoose from 'mongoose';
// // const connectDB = async () => {
// //   try {
// //     await mongoose.connect('mongodb://127.0.0.1:27017/testdb');
// //     console.log(`MongoDB is connected`);
// //   } catch (error) {
// //     console.error(error.message);
// //   }
// // };

// mongoose
//   .connect('mongodb://127.0.0.1:27017/testdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
//     connectTimeoutMS: 30000, // Increase to 30 seconds
//   })
//   .then(() => console.log('MongoDB Connected!'))
//   .catch((err) => console.error('MongoDB Connection Error:', err));

// export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      connectTimeoutMS: 30000, // 30 seconds connection timeout
    });
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
