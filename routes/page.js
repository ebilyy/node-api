const express = require('express');

const PageController = require('../controllers/page');

const router = express.Router();

router.post('/pages', PageController.create)
router.get('/pages', PageController.getAll)
router.get('/pages/:login', PageController.getPagesByUserLogin)
router.delete('/pages/:id', PageController.daletePage)
// router.patch('/pages/:id', PageController.updatePage)
module.exports = router; 