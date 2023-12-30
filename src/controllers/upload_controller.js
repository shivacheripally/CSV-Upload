const CSVUpload = require('../models/upload_model');
const fs = require('fs');
const csv = require('csv-parser');

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
    try {
      const results = [];
  
      // Get the path to the uploaded CSV file
      const csvFilePath = req.file.path;
  
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', async () => {
    
          // res.status(200).json({ data: results });
          
          CSVUpload.create(
            {
              fileName: req.file.originalname,
              fileData: results
            }
          )
            
          const dbData = await getDBData();

          return res.redirect('back');
        })
        .on('error', (error) => {
          console.error('Error while processing the CSV file:', error);
          res.status(500).json({ error: 'Failed to process the CSV file' });
        });
    } catch (err) {
      console.log(`Error while reading csv file: ${err}`);
      return res.status(500).json({ error: 'Failed to process the CSV file' });
    }
  };

  static showData = async function(req, res){
    const id = req.query.id;
    const fileData = await CSVUpload.findById(id);
    
    return res.render('showData', {
      title: 'Your | Data',
      fileData: fileData.fileData
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