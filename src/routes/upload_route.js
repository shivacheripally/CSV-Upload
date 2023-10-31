const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload_controller');

router.get('/', uploadController.upload_file);

module.exports = router;