import inventory from '../model/inventory.js';
import Inventory from '../model/inventory.js';

class inventoryCrud {
  createInventory = async (query) => {
    return await Inventory.create(query);
  };
  findAll = async (query) => {
    return await Inventory.find(query);
  };
  findInventory = async (inventoryId) => {
    return await Inventory.findById(inventoryId);
  };
  updateInventory = async (query, data) => {
    return await Inventory.findByIdAndUpdate(query, data);
  };
  deleteInventory = async (query) => {
    return await Inventory.findByIdAndDelete(query);
  };
}

export default new inventoryCrud();
