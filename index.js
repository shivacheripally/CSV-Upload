const express = require('express');
const router = require('./src/routes/upload_route');
const db = require('./src/config/mongoose');
const port = 8000;

const app = express();

app.use(express.urlencoded({extends: true}))

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use('/', router);

app.listen(port, function(err){
    if(err){
        console.log(`Error while server is up: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
})