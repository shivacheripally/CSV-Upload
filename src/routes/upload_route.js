const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload_controller');

router.get('/', uploadController.uploadFile);

router.post('/getFile',uploadController.accessFile);

module.exports = router;