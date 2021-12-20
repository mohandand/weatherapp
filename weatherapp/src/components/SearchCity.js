import React, {useState, useEffect } from 'react';

import axios from "axios";

const SearchCity = (props) => {
    // const coordinat = JSON.parse(props.location);
    let appkey = "67bc9bc02d6edac4e91852897e29d054";
    // let currentcityurl = `api.openweathermap.org/data/2.5/forecast?lat=${coordinat.lat}&lon=${coordinat.lng}&appid=${appkey}`
    
    const [cityname,setcityname] = useState("");    
    const [day,setDay] = useState("Sun");
    const [temperature, setTemparature] = useState("");
    const [desc, setDesc] = useState("");
    const [icon, setIcon] = useState("");
    const[weatherdata, setWeatherData] = useState([]);
    
    const [x, setx] = useState(0);
    const [y, sety] = useState(0);


    const savePositionToState = (position) => {
        setx(position.coords.latitude);
        sety(position.coords.longitude);
    }


    async function fetchWeather(){
        await window.navigator.geolocation.getCurrentPosition(savePositionToState);
        const cityurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&units=metric&appid=67bc9bc02d6edac4e91852897e29d054`
        console.log(cityurl);
        fetchWeatherGC(cityurl);
    }

    async function fetchWeatherGC(url){
        let res = await fetch(url);
        const response = await res.json();
        // let dates = (response.list).map((item) => {
        //     let date = item.dt_txt;
        //     return date.slice(0,10);
        // })
        // let fivedates = dates.filter((item,i,ar) => ar.indexOf(item) === i)
        //  let fiveindex =  fivedates.map((item) => {
        //      return dates.indexOf(item);
        //  })
        let fiveindex = [0,8,16,24,32,39]
         updateWeather(response, fiveindex);
    }

     function updateWeather(resonse,indexs){
        var array=[]
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for(let i= 0; i<indexs.length;i++){
            let daynam = new Date(resonse.list[indexs[i]].dt_txt)
            var dayName = days[daynam.getDay()];
            let obj = {
                day:  dayName,
                temp: resonse.list[indexs[i]].main.temp,
                icon: resonse.list[indexs[i]].weather[0].icon,
                desc: resonse.list[indexs[i]].weather[0].main,
                humidity: resonse.list[indexs[i]].main.humidity,
                sunset: resonse.city.sunset,
                sunrise: resonse.city.sunrise,
                presure:resonse.list[indexs[i]].main.pressure
            }
            array.push(obj);
        }
        setWeatherData([...array]);
        console.log(array);
        console.log(weatherdata);
     } 
     

    var pos = 1;

    useEffect(() => {
        fetchWeather();
    },[]);

    const handleCity= (event) =>{
        event.preventDefault();
        setcityname(event.target.value)
    }
    const getweather= (event) =>{
        event.preventDefault();
        const cityurl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=${appkey}`
        fetchWeatherGC(cityurl);
    }
    let weekdaysdata;


     weekdaysdata = weatherdata.map((item) => {
        return(
       <li className="day">
            <span>{item.day}</span>
           <span>
               {item.temp}
               <sup>o</sup>
           </span>
           <span class="weatherIcon">
           <img className="icon" src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}></img> 
           </span>
           <span>{item.desc}</span>
       </li> 
        )
    })
    if(weatherdata){
    return(
        <div className="app-container">
            <div className="searchinput"> 
                <input type="input" className="sinput" onChange={handleCity} placeholder="Search For a City"/>
                <button className="searchbutton" onClick={getweather}>Search</button>
            </div>
            <div className="weekforecast">
                <ul className="alldays">
                        {weekdaysdata}
                </ul>
            </div>
            {/* <div className="description">
                <div className="itemdescrption">
                    <span className="weatherattribute">Pressure</span>
                    <span>{weatherdata[0].desc}</span>
                </div>
                <div className="itemdescrption">
                    <span className="weatherattribute">Pressure</span>
                    <span>{weatherdata[0].desc}</span>
                </div>
            </div>
            <div className="description">
                <div className="itemdescrption">
                    <span className="weatherattribute">Pressure</span>
                    <span>{weatherdata[0].desc}</span>
                </div>
                <div className="itemdescrption">
                    <span className="weatherattribute">Pressure</span>
                    <span>{weatherdata[0].desc}</span>
                </div>
            </div> */}
        </div>
    )
    }
}



export default SearchCity