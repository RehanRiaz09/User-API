import messageUtil from '../utilities/message.js';
import Response from '../utilities/response.js';
import forecastservice from '../services/forecastservice.js';
import mongoose from 'mongoose';
// import Forecast from '../model/forecast.js';

class forecastController {
  forecastCreate = async (req, res) => {
    try {
      const forecast = await forecastservice.createForecast({
        ...req.body,
      });
      return Response.success(res, messageUtil.OK, forecast);
    } catch (error) {
      return Response.success(res, error);
    }
  };

  getAllForecast = async (req, res) => {
    try {
      const docs = await forecastservice.findAll(req.body);
      return Response.success(res, messageUtil.OK, docs);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };

  forecastById = async (req, res) => {
    try {
      const id = req.params.forecastId;
      let forecast = await forecastservice.findforecast(id, req.forecastId);
      if (!forecast) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      } else {
        return Response.success(res, messageUtil.OK, forecast);
      }
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
  forecastUpdate = async (req, res) => {
    try {
      const { forecastId } = req.params;

      // Validate ObjectId
      if (!mongoose.isValidObjectId(forecastId)) {
        return Response.badRequest(res, 'Invalid Forecast ID');
      }

      // Find the forecast
      let forecast = await forecastservice.findforecast({ _id: forecastId });
      if (!forecast) {
        return Response.notfound(res, messageUtil.NOT_FOUND);
      }

      // Update the forecast
      const updatedForecast = await forecastservice.updateforecast(
        { _id: forecastId },
        req.body // Assuming req.body contains the updated data
      );

      return Response.success(res, messageUtil.OK, updatedForecast);
    } catch (error) {
      console.error('Forecast update error:', error);
      return Response.serverError(res, 'Failed to update forecast');
    }
  };
  forecastDelete = async (req, res) => {
    try {
      const { forecastId } = req.params;
      let forecast = await forecastservice.findforecast({ _id: forecastId });
      if (!forecast) {
        return await Response.notfound(res, messageUtil.NOT_FOUND);
      }
      forecast = await forecastservice.delateForecast({ _id: forecastId });
      return Response.success(res, messageUtil.OK, forecast);
    } catch (error) {
      return Response.serverError(res, error);
    }
  };
}
export default new forecastController();
