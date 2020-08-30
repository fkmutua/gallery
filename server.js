const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

// connecting the database
<<<<<<< HEAD

const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env]
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
    if (err) {
        console.log(err)
    }else{
=======
const MONGODB_URI = process.env.MONGODB_URI || config.mongoURI[app.settings.env]
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
>>>>>>> master
        console.log(`Connected to Database: ${MONGODB_URI}`)
    }
});

// let dbName = 'darkroom';
// mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
//     if (err) console.log(err)
// });

// test if the database has connected successfully
<<<<<<< HEAD
// let db = mongoose.connection;
// db.once('open', ()=>{
//     console.log('Database connected successfully')
// })


=======

// let db = mongoose.connection;
// db.once('open', () => {
//     console.log('Database connected successfully')
// })
>>>>>>> master


// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});

<<<<<<< HEAD

=======
>>>>>>> master
module.exports = app;