import React, {useState, useEffect} from 'react';
import WeatherGraph from "./WeatherGraph";
import WeekDaysWeatherDataDisplay from './WeekDaysWeatherDataDisplay';
import ExtraWeatherInfo from './ExtraWeatherInfo';
import CityName from './CityName.js';
import axios from "axios";

const SearchWeatheData = (props) => {

    let appkey = "67bc9bc02d6edac4e91852897e29d054";    
    const [cityname,setcityname] = useState("");    
    const [res,setRes] = useState(" ");
    const[weatherdata, setWeatherData] = useState([]);

//Getting Current Location And calling Fetch Wetaherdata function.
    const savePositionToState = (position) => {
        const cityurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${appkey}`
        console.log(cityurl);
        fetchWeather(cityurl);
 }

//Getting Current Location Co-ordinates

    async function getLocationAndDisplay(){
        await window.navigator.geolocation.getCurrentPosition(savePositionToState);  
    }
//Fetch Weather with API

    async function fetchWeather(url){
        let res = await fetch(url);
        const response = await res.json();
        setRes(response.cod);
        console.log(response.cod)
        let dates = (response.list).map((item) => {
            let date = item.dt_txt;
            return date.slice(0,10);
        })
        let fivedates = dates.filter((item,i,ar) => ar.indexOf(item) === i)
         let fiveindex =  fivedates.map((item) => {
             return dates.indexOf(item);
         })
        //let fiveindex = [0,8,16,24,32,39]
         updateWeather(response, fiveindex);
    }

//Update Weather Data State

     function updateWeather(resonse,indexs){
        var array=[]
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for(let i= 0; i<indexs.length;i++){
            let daynam = new Date(resonse.list[indexs[i]].dt_txt)
            var dayName = days[daynam.getDay()];
            let settime1 = new Date(resonse.city.sunset);
            let settime = settime1.toLocaleTimeString();
            let risetime1 = new Date(resonse.city.sunrise);
            let risetime = risetime1.toLocaleTimeString();
            let text= resonse.list[indexs[i]].weather[0].icon;
            let iconsym =  text.replace('n', 'd');
            console.log(text);
            console.log(iconsym);
            let obj = {
                day:  dayName,
                temp: resonse.list[indexs[i]].main.temp,
                icon: iconsym,
                desc: resonse.list[indexs[i]].weather[0].main,
                humidity: resonse.list[indexs[i]].main.humidity,
                sunset: settime,
                sunrise: risetime,
                presure:resonse.list[indexs[i]].main.pressure,
                city:resonse.city.name,
                rescode: resonse.cod
            }
            array.push(obj);
        }
        setWeatherData([...array]);

     } 

//Intiate getLocationAndDisplay function when page render intially.
     
    useEffect(() => {
        getLocationAndDisplay();
    },[]);

//Update City State

    const handleCity= (event) =>{
        event.preventDefault();
        setcityname(event.target.value)
    }
//Calling fetchWeather Function when user entered a city

    const getweather= (event) =>{
        event.preventDefault();
        const cityurl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=${appkey}`
        fetchWeather(cityurl);
    }   
//Render Main page onto the page
    if(weatherdata){
    return(
        <div className="app-container">
            <div className="searchinput"> 
                <input type="input" className="sinput"  value={cityname} onChange={handleCity} placeholder="Search For a City"/>
                <button className="searchbutton" onClick={getweather}>Search</button>
            </div>
            <div className="description">
                <CityName  weatherdata={weatherdata} res={res} cityname={cityname} />
            </div>
            <div className="weekforecast">  
                <WeekDaysWeatherDataDisplay weatherdata={weatherdata} />
            <div className="Weathergraph">
                <WeatherGraph   weatherdata={weatherdata}/>
            </div>
                <ExtraWeatherInfo weatherdata={weatherdata}/>
            </div>
        </div>
    )
    }
}
export default SearchWeatheData