import { Schema, model } from 'mongoose';

const inventorySchema = new Schema({
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  qtyOnHand: { type: Number, required: true },
  weeklyDemand: { type: Number, required: true },
  alertType: { type: String, enum: ['Stockout', 'Overstock'], required: true },
});
export default model('Inventory', inventorySchema);
