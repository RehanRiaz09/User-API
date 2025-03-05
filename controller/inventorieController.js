import inventoryService from '../services/inventoryService.js';
import messageUtil from '../utilities/message.js';
import Response from '../utilities/response.js';
import mongoose from 'mongoose';

class inventoryController {
  inventoryCreate = async (req, res) => {
    try {
      // creating inventory in database
      const inventory = await inventoryService.createInventory({ ...req.body });
      // check the inventory present or not
      if (!inventory) {
        // return the response
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, inventory);
      }
    } catch (error) {
      // return the response for error
      return Response.serverError(res, error);
    }
  };
  getAllinventory = async (req, res) => {
    try {
      // Get all the inventories
      const inventories = await inventoryService.findAll(req.body);
      // check the inventories present or not
      if (!inventories) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        // return the Response
        return Response.success(res, messageUtil.OK, inventories);
      }
    } catch (error) {
      c;
      return Response.serverError(res, error);
    }
  };
  inventoryById = async (req, res) => {
    try {
      // Extracts the inventoryId parameter from the request URL
      const id = req.params.inventoryId;
      // check the inventory by Id
      let inventory = await inventoryService.findInventory(id, req.inventoryId);
      // check the inventory present or not
      if (!inventory) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        // return the response
        return Response.success(res, messageUtil.OK, inventory);
      }
    } catch (error) {
      // send the response to server error
      return Response.serverError(res, error);
    }
  };
  inventoryUpdate = async (req, res) => {
    try {
      const { inventoryId } = req.params;
      // Validate ObjectId
      if (!mongoose.isValidObjectId(inventoryId)) {
        return Response.badRequest(res, 'Invalid Forecast ID');
      }
      // find the inventory using ID
      let inventory = await inventoryService.findInventory({
        _id: inventoryId,
      });
      if (!inventory) {
        // send the response inventor not found
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      // update the inventory
      const updatedForecast = await inventoryService.updateInventory(
        { _id: inventoryId },
        req.body // Assuming req.body contains the updated data
      );
      // return the response
      return Response.success(res, messageUtil.OK, updatedForecast);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  inventoryDelete = async (req, res) => {
    try {
      const { inventoryId } = req.params;
      // find the inventory byy Id
      let inventory = await inventoryService.findInventory({
        _id: inventoryId,
      });
      // check the inventory present or not
      if (!inventory) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }
      // delete the inventory
      inventory = await inventoryService.deleteInventory({ _id: inventoryId });
      return Response.success(res, messageUtil.OK, 'Inventory deleted');
    } catch (error) {
      // send the response for the server error
      return Response.serverError(res, error);
    }
  };
}
export default new inventoryController();
