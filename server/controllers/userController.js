const ApiError = require('../error/ApiError')
const { User, Rating } = require('../models/models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path')

const signJWT = (id, email, name, avatar) => {
    return jwt.sign(
        {id:id, email, name, avatar}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async reg (req, res, next) {
        try {
            const {email, password, name} = req.body
            const {avatar} = req.files

            if (!email || !password) {
                return next(ApiError.badRequest('Неккоректный email или пароль'))
            }
            const checkMail = await User.findOne({where: {email}})
            if (checkMail) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const checkName = await User.findOne({where:{name}})
            if (checkName) {
                return next(ApiError.badRequest(`Пользователь с именем ${name} уже существует`))
            }

            let fileName = uuid.v4() + '.' + avatar.name.split('.').pop()
            avatar.mv(path.resolve(__dirname, '..', 'static', fileName))

            const hashPassword = await bcrypt.hash(password, 5)
            const users = await User.create({email, password:hashPassword, name, avatar: fileName})
            const token = signJWT(users.id, email, name, users.avatar)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async login (req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePasswd = bcrypt.compareSync(password, user.password)
        if (!comparePasswd) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = signJWT(user.id, user.email, user.name, user.avatar)
        return res.json({token})
    }

    async check (req, res, next) {
        const user = await User.findOne({where:{id: req.user.id}})
        const token = signJWT(req.user.id, user.email, user.name, user.avatar)
        return res.json({token})
    }

    async getUsers (req, res, next) {
        try {
            const users = await User.findAll()
            return res.json({users})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUserId (req, res, next) {
        try {
            const {id} = req.query
            const user = await User.findOne({where: {id}})
            return res.json({user})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUserName (req, res, next) {
        try {
            const {name} = req.query
            const user = await User.findOne({where: {name}})
            return res.json({user})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeUserName (req, res, next) {
        try {
            const {name, id} = req.body
            const user = await User.update({name}, {where: {id}})
            return res.json({user})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}
module.exports = new UserController()