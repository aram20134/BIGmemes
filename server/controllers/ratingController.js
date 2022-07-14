const ApiError = require("../error/ApiError");
const { Rating } = require("../models/models");

class RatingController {
  async add(req, res, next) {
    try {
      const { theMemeId, userId} = req.body;
      const rating = await Rating.create({ theMemeId, rate:1, userId });
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async del(req, res, next) {
    try {
      const { theMemeId, userId} = req.body;
      const rating = await Rating.destroy({where:{userId, theMemeId}});
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async get(req, res, next) {
    try {
      const { theMemeId } = req.body;
      const rating = await Rating.findAll({ where: { theMemeId } });
      return res.json(rating);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}
module.exports = new RatingController();
