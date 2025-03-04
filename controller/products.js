import messageUtil from '../utilities/message.js';
import Response from '../utilities/Response.js';
import Product from '../model/product.js';
import mongoose from 'mongoose';
import csv from 'csv-parser';
import fs from 'fs';
import userService from '../services/userService.js';

import productService from '../services/productService.js';

class productController {
  newProduct = async (req, res) => {
    try {
      if (!req.file) {
        return Response.badRequest(res, 'No CSV file uploaded');
        // return res.status(400).json({ message: 'No CSV file uploaded' });
      }

      const products = [];
      const filePath = req.file.path;

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          products.push({
            SKU: row.SKU,
            user: req.body.user,
            name: row.name,
            totalSales: parseInt(row.totalSales) || 0,
            unitSold: parseInt(row.unitSold) || 0,
            inStock: parseInt(row.inStock) || 0,
            restockDate: row.restockDate ? new Date(row.restockDate) : null,
          });
        })
        .on('end', async () => {
          try {
            await Product.insertMany(products, { ordered: false });
            return Response.success(res, messageUtil.OK, products);
            // res.json({
            //   message: 'CSV Products created successfully!',
            //   products,
            // });
          } catch (error) {
            return Response.serverError(res, error);
            // res
            //   .status(500)
            //   .json({ message: 'Error inserting products', error });
          }
        });
    } catch (error) {
      return Response.serverError(res, error);
      // console.error(error);
      // res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  getAllProduct = async (req, res) => {
    try {
      let product = await productService.findAll(req.body);
      if (!product) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, product);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getUserProducts = async (req, res) => {
    try {
      const { userId } = req.params;
      const products = await productService.findAll({ user: userId });
      if (products.length === 0) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, products);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  getByID = async (req, res) => {
    try {
      const id = req.params.productId;
      let products = await productService.findProductId(id, req.productId);
      if (!products) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, products);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  productUpdate = async (req, res) => {
    try {
      const id = req.params.productId;

      let objectId;
      try {
        objectId = new mongoose.Types.ObjectId(id);
      } catch (error) {
        return Response.badRequest(res, 'Invalid Product ID');
      }

      //  Find the product
      let product = await productService.findProductId(objectId);
      if (!product) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }

      // Update the product
      product = await productService.updateProduct(
        { _id: objectId }, //  Use the correct variable
        req.body
      );

      if (!product) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }

      return Response.success(res, messageUtil.OK, product);
    } catch (error) {
      console.error('Error updating product:', error);
      return Response.serverError(res, error);
    }
  };
  productDelete = async (req, res) => {
    try {
      const { productId } = req.params;
      let product = await productService.findProductId({ _id: productId });
      if (!product) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      product = await productService.deleteProduct({ _id: productId });
      return Response.success(res, messageUtil.OK);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
}
export default new productController();
