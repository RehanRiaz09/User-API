import inventoryService from '../services/inventoryService.js';
import messageUtil from '../utilities/message.js';
import Response from '../utilities/Response.js';
import mongoose from 'mongoose';

class inventoryController {
  inventoryCreate = async (req, res) => {
    try {
      const inventory = await inventoryService.createInventory({ ...req.body });
      if (!inventory) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, inventory);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  getAllinventory = async (req, res) => {
    try {
      const inventories = await inventoryService.findAll(req.body);
      if (!inventories) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, inventories);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  inventoryById = async (req, res) => {
    try {
      const id = req.params.inventoryId;
      let inventory = await inventoryService.findInventory(id, req.inventoryId);
      if (!inventory) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, inventory);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  inventoryUpdate = async (req, res) => {
    try {
      const { inventoryId } = req.params;
      if (!mongoose.isValidObjectId(inventoryId)) {
        return Response.badRequest(res, 'Invalid Forecast ID');
      }
      let inventory = await inventoryService.findInventory({
        _id: inventoryId,
      });
      if (!inventory) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      const updatedForecast = await inventoryService.updateInventory(
        { _id: inventoryId },
        req.body // Assuming req.body contains the updated data
      );
      return Response.success(res, messageUtil.OK, updatedForecast);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  inventoryDelete = async (req, res) => {
    try {
      const { inventoryId } = req.params;
      let inventory = await inventoryService.findInventory({
        _id: inventoryId,
      });
      if (!inventory) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      inventory = await inventoryService.deleteInventory({ _id: inventoryId });
      return Response.success(res, messageUtil.OK, 'Inventory deleted');
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
}
export default new inventoryController();
