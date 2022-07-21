const Router = require('express')
const memesController = require('../controllers/memesController')
const router = new Router()

router.post('/', memesController.create)
router.post('/delmeme', memesController.delete)
router.get('/', memesController.getAll)
router.get('/memesuser', memesController.getAllUser)
router.get('/:id', memesController.getOne)

module.exports = router