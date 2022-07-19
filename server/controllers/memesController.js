const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const { TheMemes, Rating, UserMemes, Comments, User } = require('../models/models')

class MemesController {
    async create (req, res, next) {
        try {
            const {title, typeId, userId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.' + img.name.split('.').pop()
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const meme = await TheMemes.create({title, img:fileName, typeId})
            const userMeme = await UserMemes.create({userId:userId, theMemeId:meme.id})
            return res.json(meme)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getAll (req, res, next) {
        try {
            const {offset, limit} = req.query
            const memes = await TheMemes.findAll(
                {
                    offset: offset,
                    order: [ [ 'createdAt', 'DESC' ]],
                    limit: limit,
                    include: [{model:Rating, as:'rate'}, {model: Comments}, {model:UserMemes}]
                })
            const count = await TheMemes.count()
            return res.json({memes, count})
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllUser (req, res, next) {
        try {
            const {id} = req.query
            const memes = await UserMemes.findAll({where: {userId: id}})
            const userMemes = await TheMemes.findAll(
            {
                where: {id: memes.map(a => a.theMemeId)},
                include: [{model:Rating, as:'rate'}, {model: Comments}, {model:UserMemes}]
            })
            return res.json(userMemes)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne (req, res) {
        const {id} = req.params
        const meme = await TheMemes.findOne(
        {
            where: {id},
            include: [{model:Rating, as:'rate'}, {model: Comments}, {model:UserMemes}]
        })
        const user = await User.findOne({where:{id: meme.user_meme.userId}})
        return res.json({meme, user})
    }
}

module.exports = new MemesController()