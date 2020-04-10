const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs')
const appData = require('./appData')

var bodyParser = require('body-parser')
const router = express.Router();

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );



const getAppData = (query , response) => {
    // console.log('getAppData executed')
    const filePath = path.resolve(__dirname, './build', 'index.html');
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        // return console.log(err);
      }
      data = data.replace(/\$OG_TITLE/g, appData[query].OG_TITLE);
      data = data.replace(/\$OG_DESCRIPTION/g, appData[query].OG_DESCRIPTION);
      data = data.replace(/\$OG_DETAILS/g, appData[query].OG_DETAILS);
      data = data.replace(/\$OG_URL/g, appData[query].OG_URL)
      result = data.replace(/\$OG_IMAGE/g, appData[query].OG_IMAGE);
      response.send(result);
    //   console.log( 'response send from getAppdata ',result)
    });
}

app.get('/', function(request, response) {
    // console.log('Home page visited!');
    getAppData('home' , response)
});


app.get('/about', function(request, response) {
    // console.log('About page visited!');
    getAppData('about' , response)
});
  
app.get('/career', function(request, response) {
    // console.log('Career page visited!');
    getAppData('career' , response)
});


app.get('/contact', function(request, response) {
    // console.log('Contact page visited!');
    getAppData('contact' , response)
});


app.get('/privacypolicy', function(request, response) {
console.log('Privacy page visited!');
getAppData('privacypolicy' , response)
});


app.get('/enduser', function(request, response) {
    // console.log('Privacy page visited!');
    getAppData('enduser' , response)
});
    


module.exports = router;
app.use( express.static(path.join(__dirname, './build')) )

app.get('*', function(request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    response.sendFile(filePath);
});



app.listen(port, () => console.log(`Listening on port ${port}`));
