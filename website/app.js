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
let newDate = month[d.getMonth()] + '.' +  d.getDate() + '.'+ d.getFullYear();

// Asynchronous function to fetch the data from the app endpoint
let weatherData = {};
const getWeatherData = async function(url,zipCode,key){
    const res = await fetch(url+zipCode+key)
    try {
        weatherData = await res.json();
        console.log(weatherData)
    } catch (error) {
        console.log("error",error)
    }
};
generateBtn.onclick = ()=>{
    getWeatherData(apiUrl,zipCode.value,apiKey);
    postData('/Weather', {temp:weatherData.main.temp,content:feelings.value,date:newDate});
}
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
        console.log(newData);
        return newData;
    }catch(error) {
    console.log("error", error);
    }
};