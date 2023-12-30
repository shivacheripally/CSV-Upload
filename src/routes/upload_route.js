const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload_controller');

router.get('/', uploadController.home);

router.post('/uploadFile', uploadController.accessFile);

module.exports = router;