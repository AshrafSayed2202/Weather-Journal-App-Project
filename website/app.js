// Personal API Key for OpenWeatherMap API
const apiKey = 'd5159581ba8282321c434efef269d6f2&units=imperial';
const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?&appid='

/* Global Variables */
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings').value;
// Create a new date instance dynamically with JS
let d = new Date();
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let newDate = month[d.getMonth()] + '.' +  d.getDate() + '.'+ d.getFullYear();

// Asynchronous function to fetch the data from the app endpoint
const getData = async function(){
    
}