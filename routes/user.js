const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.get('/current-user', UserController.getCurentUser)
module.exports = router;
