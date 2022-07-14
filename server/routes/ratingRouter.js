
const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')

router.post('/', ratingController.add)
router.post('/del', ratingController.del)
router.get('/', ratingController.get)

module.exports = router