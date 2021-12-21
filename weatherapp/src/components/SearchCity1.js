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
    
    const [x, setx] = useState(0);
    const [y, sety] = useState(0);


    const savePositionToState = (position) => {
        setx(position.coords.latitude);
        sety(position.coords.longitude);
    }


    async function fetchWeather(){
        await window.navigator.geolocation.getCurrentPosition(savePositionToState);
        console.log(x);
        let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${x}&lon=${y}&units=metric&appid=67bc9bc02d6edac4e91852897e29d054`);    
        const response = await res.json();
        setTemparature(response.list[0].main.temp);
        setDesc(response.list[0].weather[0].main);
        setIcon(response.list[0].weather[0].icon);
        setIconImage(icon);
    }

    async function fetchWeatherGC(url){
        let res = await fetch(url);
        const response = await res.json();
        setTemparature(response.list[0].main.temp);
        setDesc(response.list[0].weather[0].main);
        setIcon(response.list[0].weather[0].icon);
        setIconImage(icon);
    }

    let iconrender;
    var pos = 1;

    function setIconImage(icon){
        switch(icon){
            case "01n":
                pos = 1;
                break;
            case "02n":
                pos = 2;
                break;
            default:
                iconrender = '../images/03n.png';
        }
        
    }

    useEffect(() => {
        fetchWeather();
    },[x,y]);

    const handleCity= (event) =>{
        event.preventDefault();
        setcityname(event.target.value)
    }
    const getweather= (event) =>{
        event.preventDefault();
        const cityurl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=${appkey}`
        fetchWeatherGC(cityurl);
    }

    return(
        <div className="app-container">
            <div className="searchinput"> 
                <input type="input" className="sinput" onChange={handleCity} placeholder="Search For a City"/>
                <button className="searchbutton" onClick={getweather}>Search</button>
            </div>
            <div className="weekforecast">
                <ul className="alldays">
                    <li className="day">
                        <span>{day}</span>
                        <span>
                            {temperature}
                            <sup>o</sup>
                        </span>
                        <span class="weatherIcon">
                        <img className="icon" src={require(`../images/0${pos}n.png`)}></img> 
                        </span>
                        <span>{desc}</span>
                    </li>
                    <li className="day">
                        <span>{day}</span>
                        <span>
                            {temperature}
                            <sup>o</sup>
                        </span>
                        <span class="weatherIcon">
                        <img className="icon" src={require(`../images/0${pos}n.png`)}></img>
                        </span>
                        <span>{desc}</span>
                    </li>
                    <li className="day">
                        <span>{day}</span>
                        <span>
                            {temperature}
                            <sup>o</sup>
                        </span>
                        <span class="weatherIcon">
                        <img className="icon" src={require(`../images/0${pos}n.png`)}></img>
                        </span>
                        <span>{desc}</span>
                    </li>
                    <li className="day">
                        <span>{day}</span>
                        <span>
                            {temperature}
                            <sup>o</sup>
                        </span>
                        <span class="weatherIcon">
                        <img className="icon" src={require(`../images/0${pos}n.png`)}></img>
                        </span>
                        <span>{desc}</span>
                    </li>
                    <li className="day">
                        <span>{day}</span>
                        <span>
                            {temperature}
                            <sup>o</sup>
                        </span>
                        <span class="weatherIcon">
                        <img className="icon" src={require(`../images/0${pos}n.png`)}></img>
                        </span>
                        <span>{desc}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SearchCity

let weekdaysdata = weatherdata.map((item) => {
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

<li className="day">
<span>{weatherdata[0].day}</span>
<span>
    {weatherdata[0].temp}
    <sup>o</sup>
</span>
<span className="weatherIcon">
<img className="icon" src={`https://openweathermap.org/img/wn/${weatherdata[0].icon}@2x.png`}></img> 
</span>
<span>{weatherdata[0].desc}</span>
</li>

 <div className="description">
                <div className="itemdescrption">
                    <span className="weatherattribute">Pressure</span>
                    <span>Presur</span>
                </div>
                <div className="itemdescrption">
                    <span className="weatherattribute">Pressure</span>
                    <span>Presur</span>
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
            </div>