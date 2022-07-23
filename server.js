// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port,listening);

function listening(){
    console.log(`Local server is running on port : ${port}`)
}
// POST route setup
app.post('/addWeather',reciveData);
function reciveData (request,response){
    let data = request.body;
    // adding the data to the server endpoint
    projectData['city'] = data.city
    projectData['date'] = data.date;
    projectData['temp'] = data.temp;
    projectData['description'] = data.description;
    projectData['content'] = data.content;
};
// GET route setup
app.get('/retrieveData', sendData);

function sendData (request, response) {
    // send data to UpdateUI
    response.send(projectData);
};