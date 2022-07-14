const Router = require('express')
const router = new Router()
const commentRouter = require('./commentRouter')
const memesRouter = require('./memesRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const ratingRouter = require('./ratingRouter');

router.use('/user', userRouter)
router.use('/comment', commentRouter)
router.use('/type', typeRouter)
router.use('/memes', memesRouter)
router.use('/rate', ratingRouter)

module.exports = router