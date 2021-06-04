const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

// define mongooose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  const contact = mongoose.model('contact', contactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')) //for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{

    const params = { }
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{

    const params = { }
    res.status(200).render('contact.pug',params);
})

app.post('/contact', (req, res)=>{
   var myData = new contact(req.body);
   myData.save().then(()=>{
       res.send("this item has been saved to the database")
   }).catch(()=>{
       res.status(400).send("item was not saved to the database")
   });
      

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
