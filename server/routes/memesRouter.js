const Router = require('express')
const memesController = require('../controllers/memesController')
const router = new Router()

router.post('/', memesController.create)
router.get('/', memesController.getAll)
router.get('/memesuser', memesController.getAllUser)
router.get('/:id', memesController.getOne)

module.exports = router