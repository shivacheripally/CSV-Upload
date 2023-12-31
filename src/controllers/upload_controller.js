const CSVUpload = require('../models/upload_model');
const fs = require('fs');
const csv = require('csv-parser');

const CsvReadableStream = require('csv-reader');
const AutoDetectDecoderStream = require('autodetect-decoder-stream');
const getDBData = async () => {
  try {
    const dbData = await CSVUpload.find({});

    return dbData;
  } catch (error) {
    console.error('Error while querying the database:', error);
    throw error; // Handle the error or return an appropriate response
  }
};
class uploadController {

  static home = async function (req, res) {
    const dbData = await getDBData();

    res.render('home', {
      title: "Home | Page",
      dbData
    })
  }

  static uploadFile = function (req, res) {
    const results = [];
    try{
      let inputStream = fs.createReadStream(req.file.path)
      .pipe(new AutoDetectDecoderStream({ defaultEncoding: '1255' })); 
      inputStream
      .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
      .on('data', function (row) {      
        results.push(row)//[0].split(';'));
      }).on('end', async () => {    

      CSVUpload.create(
      {
        fileName: req.file.originalname,
        fileData: results
      })
              
      return res.redirect('back');
      })
      .on('error', (error) => {
        console.error('Error while processing the CSV file:', error);
        res.status(500).json({ error: 'Failed to process the CSV file' });
      })
    }
    catch (err) {
      console.log(`Error while reading csv file: ${err}`);
      return res.status(500).json({ error: 'Failed to process the CSV file' });
    }
  }

  static showData = async function(req, res){
    const id = req.query.id;
    const fileData = await CSVUpload.findById(id);
    
    return res.render('showData', {
      title: 'Your | Data',
      headers: fileData.fileData[0],
      fileData: fileData.fileData.splice(1)
    })
  } 

  static deleteFile = async function (req, res) {
    const id = req.query.id;
    await CSVUpload.findByIdAndDelete(id);
    console.log('Successfully Deleted');

    return res.redirect('/');
  }
}

module.exports = uploadController;