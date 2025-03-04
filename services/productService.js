import { query } from 'express';
import Product from '../model/product.js';
class productCRUD {
  createProduct = async (query) => {
    return await Product.create(query);
  };
  findAll = async (query) => {
    return await Product.find(query).populate('user', 'name email');
  };
  findProduct = async (query) => {
    return await Product.find(query);
  };
  findProductId = async (productId) => {
    return await Product.findById(productId).populate('user', 'name email');
  };
  updateProduct = async (query, data) => {
    return await Product.findByIdAndUpdate(query, data, { new: true });
  };
  deleteProduct = async (query) => {
    return await Product.findOneAndDelete(query);
  };
}
export default new productCRUD();
