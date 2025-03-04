import mongoose, { Schema, model } from 'mongoose';
const productSchema = new Schema(
  {
    SKU: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    totalSales: { type: Number, default: 0 },
    unitSold: { type: Number, default: 0 },
    inStock: { type: Number, default: 0 },
    restockDate: { type: Date },
  },
  { timestamps: true }
);
export default model('Produt', productSchema);
