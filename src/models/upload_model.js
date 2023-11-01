const mongoose = require('mongoose');

const csvuploadSchema = new mongoose.Schema({
    name: String
});

const CSVUpload = mongoose.model('CSVUpload', csvuploadSchema);

module.exports = CSVUpload;