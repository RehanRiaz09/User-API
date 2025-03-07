import mongoose, { Schema, model } from 'mongoose';
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isSubscribed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});
export default model('User', userSchema);
