const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 8000;



//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    Mobile_Number: String,
    email: String,
    address: String,
    concern: String,

});
var registerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    Mobile_Number: String,
    email: String,
    address: String,
    myGender:String,
    danceStyle:String

});

var contact = mongoose.model('contact', contactSchema);
var registration = mongoose.model('registration', registerSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for serving static file
app.use(express.urlencoded())

//PUG SPECIFIC CONFIGURATION OR STUFF
app.set('view engine', 'html');//set the template engine as html
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'))//Set the views directory


//ENDPOINTS
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('index.html', params);
});
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.html', params);
});
app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.html', params);
});
app.get('/classInfo', (req, res) => {
    const params = {}
    res.status(200).render('classInfo.html', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.html', params);
});

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")

    }).catch(() => {
        res.status(400).send("Item was not saved");
    })
    
});
app.post('/classInfo', (req, res) => {
    var myBooking = new registration(req.body);
    myBooking.save().then(() => {
        res.send("This item has been saved to the database")

    }).catch(() => {
        res.status(400).send("Item was not saved");
    })
    
});




//START SERVER
app.listen(port, () => {
    console.log(`The application started succesfully in port ${port}`)
});