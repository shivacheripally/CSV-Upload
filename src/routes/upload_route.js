const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const uploadController = require('../controllers/upload_controller');

router.get('/', uploadController.home);

router.get('/home', uploadController.home);

router.post('/uploadFile',upload.single('uploaded_file'), uploadController.uploadFile);

router.get('/showData', uploadController.showData);

router.get('/deleteFile', uploadController.deleteFile);
module.exports = router;