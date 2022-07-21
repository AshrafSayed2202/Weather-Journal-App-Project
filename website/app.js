// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d5159581ba8282321c434efef269d6f2&units=imperial';
const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?q='
/* Global Variables */
const zipCode = document.getElementById('zip');
const generateBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
// Create a new date instance dynamically with JS
let d = new Date();
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let newDate = d.getDate() + '.' + month[d.getMonth()] + '.'+ d.getFullYear();

// Asynchronous function to fetch the data from the app endpoint
let weatherData = {};
const getWeatherData = async function(url,zipCode,key){
    const res = await fetch(url+zipCode+key)
    try {
        let data = await res.json();
        weatherData = data;
    } catch (error) {
        console.log("error",error)
    }
};
generateBtn.addEventListener('click',performAction);
function performAction(){
    getWeatherData(apiUrl,zipCode.value,apiKey).then(()=>{
        postData('/addWeather', {temp:weatherData.main.temp,content:feelings.value,date:newDate});
    }).then(()=>{
        retrieveData();
    })
};
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
     // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
    console.log("error", error);
    }
};
const retrieveData = async () =>{
    const request = await fetch('/retrieveData',{
        method: 'GET', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
    console.log("error", error);
      // appropriately handle the error
    }
};
zipCode.onfocus = function(){
    zipCode.attributes.placeholder = "";
}