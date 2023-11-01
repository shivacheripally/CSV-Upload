const mongoose = require('mongoose');

const csvuploadSchema = new mongoose.Schema({
    fileName: String,
    fileData: []
});

const CSVUpload = mongoose.model('CSVUpload', csvuploadSchema);

module.exports = CSVUpload;