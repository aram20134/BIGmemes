const Router = require('express')
const commentController = require('../controllers/commentController')
const router = new Router()

router.post('/', commentController.add)
router.get('/', commentController.get)

module.exports = router