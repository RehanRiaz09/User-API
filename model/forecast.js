import mongoose, { Schema, model } from 'mongoose';

const forecastSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  forecastedDemand: { type: Number, required: true },
  days30: { type: Number, required: true },
  days60: { type: Number, required: true },
  days90: { type: Number, required: true },
});

export default model('Forecast', forecastSchema);
