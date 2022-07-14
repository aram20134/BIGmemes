const ApiError = require("../error/ApiError")
const { Comments } = require("../models/models")

class CommentController {
    async add (req, res, next) {
        try {
            const {text, userId, theMemeId} = req.body
            const comm = await Comments.create({text, userId, theMemeId})
            return res.json(comm)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async get (req, res, next) {
        try {
            const {id} = req.query
            const comm = await Comments.findAll({where:{theMemeId:id}})
            return res.json(comm)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}
module.exports = new CommentController()