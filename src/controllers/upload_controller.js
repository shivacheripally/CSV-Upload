const fs = require('fs');
const csv = require('csv-parser');

class uploadController {

    static uploadFile = function(req, res){
        res.render('home', {
            title: "Home | Page"
        })
    }

    static accessFile(req, res) {
        try{
            const results = []; // This array will store the objects from the CSV data.
      
        // Specify the path to your CSV file. You can get it from the request or define it as needed.
        const csvFilePath = req.body.csvname;
      
        fs.createReadStream(csvFilePath)
          .pipe(csv())
          .on('data', (row) => {
            // For each row in the CSV, create an object and push it to the results array.
            results.push(row);
          })
          .on('end', () => {
            // All data has been read and processed.
            console.log('CSV data unpacked:');
            console.log(results);
      
            // You can do further processing with the 'results' array here.
      
            // Send the response to the client if needed.
            res.status(200).json({ data: results });
          })
          .on('error', (error) => {
            console.error('Error while processing the CSV file:', error);
            // Handle the error and send an appropriate response to the client.
            res.status(500).json({ error: 'Failed to process the CSV file' });
          });
        }
        
        catch(err){
            console.log(`Error while reading csv file: ${err}`);
            return ;
        }
      }
}

module.exports = uploadController;