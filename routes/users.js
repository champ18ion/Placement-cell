const express = require('express')
const router = express.Router();


// importing user controller
const userController = require('../controllers/userController')

router.get('/',userController.signUp)

router.get('/log-in',userController.signIn)

router.post('/create',userController.create)


module.exports = router;