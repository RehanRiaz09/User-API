import Forecast from '../model/forecast.js';

class forecastCrud {
  createForecast = async (query) => {
    return await Forecast.create(query);
  };
  findAll = async (query) => {
    return await Forecast.find(query).populate('productId', 'SKU name');
  };
  findforecast = async (forecastId) => {
    return await Forecast.findById(forecastId).populate(
      'productId',
      'SKU name'
    );
  };
  updateforecast = async (query, data) => {
    return await Forecast.findByIdAndUpdate(query, data);
  };
  delateForecast = async (query) => {
    return await Forecast.findByIdAndDelete(query);
  };
}
export default new forecastCrud();
