// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d5159581ba8282321c434efef269d6f2&units=metric';
const apiUrl= 'https://api.openweathermap.org/data/2.5/weather?q='
/* Global Variables */
const zipCode = document.getElementById('zip');
const generateBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const resetBtn = document.getElementById('reset');
// Create a new date instance dynamically with JS
let d = new Date();
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let newDate = d.getDate() + ' / ' + month[d.getMonth()] + ' / '+ d.getFullYear();

// Asynchronous function to fetch the data from the web API
let weatherData = {};
const getWeatherData = async function(url,zipCode,key){
    const res = await fetch(url+zipCode+key)
    try {
        let data = await res.json();
        weatherData = data;
        console.log(weatherData)
    } catch (error) {
        console.log("error",error)
    }
};
// Event listeners to add function to existing HTML DOM element
resetBtn.addEventListener('click',resetAction);
function resetAction(){
    zipCode.value = "";
    feelings.value = "";
    document.querySelectorAll('#entryHolder>div').forEach((e)=>{
        e.style.display = 'none'
    });
}
generateBtn.addEventListener('click',performAction);
function performAction(){
    getWeatherData(apiUrl,zipCode.value,apiKey).then(()=>{
        postData('/addWeather', {city:weatherData.name,temp:weatherData.main.temp,content:feelings.value,date:newDate});
    }).then(()=>{
        retrieveData();
    })
    document.querySelectorAll('#entryHolder>div').forEach((e)=>{
        e.style.display = 'block'
    });
};
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
    console.log("error", error);
    }
};
/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/retrieveData');
    try {
    const allData = await request.json()
    // UpdateUI
    document.getElementById('city').innerHTML = allData.city;
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' C°';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
    console.log("error", error);
    }
};