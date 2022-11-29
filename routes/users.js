const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');

router.post('/',UserController.create)
router.post('/login', UserController.login)
router.delete('/logout',authentication, UserController.logout)
router.get('/getUserWithOrderById',authentication, UserController.getUserWithOrderById)

module.exports = router;