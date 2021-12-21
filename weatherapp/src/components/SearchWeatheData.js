import React, {useState, useEffect} from 'react';
import Chart from "./LineChart";
import axios from "axios";


const SearchWeatheData = (props) => {

    let appkey = "67bc9bc02d6edac4e91852897e29d054";    
    const [cityname,setcityname] = useState("");    
    const [res,setRes] = useState(" ");
    const[weatherdata, setWeatherData] = useState([]);

    const savePositionToState = (position) => {
        const cityurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${appkey}`
        console.log(cityurl);
        fetchWeatherGC(cityurl);
    }


    async function fetchWeather(){
        await window.navigator.geolocation.getCurrentPosition(savePositionToState);  
    }

    async function fetchWeatherGC(url){
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
            //let settime2= settime.slice(16,8);
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


     weekdaysdata = weatherdata.map((item,i) => {
        return(
       <li className="day" key={i}>
            <span >{item.day}</span>
           <span className="temp">
               {item.temp}
               <sup>o</sup>
           </span>
           <span className="weatherIcon">
           <img className="icon" src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}></img> 
           </span>
           <span>{item.desc}</span>
       </li> 
        )
    })
    let extradata;

    if(weatherdata.length){

     extradata = <div className="descriptionmain">
                       <div className="description">
                          <div className="itemdescrption">
                             <span className="weatherattribute">Pressure</span>
                             <span>{weatherdata[0].presure}</span>
                          </div>
                          <div className="itemdescrption">
                            <span className="weatherattribute">humidity</span>
                            <span>{weatherdata[0].humidity}</span>
                          </div>
                      </div>
                      <div className="description">
                          <div className="itemdescrption">
                             <span className="weatherattribute">Sunset</span>
                             <span>{weatherdata[0].sunset}</span>
                          </div>
                          <div className="itemdescrption">
                            <span className="weatherattribute">Sunrise</span>
                            <span>{weatherdata[0].sunrise}</span>
                          </div>
                      </div>
                      <div>
                          {Chart}
                      </div>
                    </div>;

    }   

    var citydescription;

    if(weatherdata.length){

    if(res === "200"){

        citydescription = <span className="weatherattribute">CityName:{weatherdata[0].city}</span>
    }else{
        citydescription = <span className="weatherattribute">Weather data for {cityname} is not available</span>
    }

    }

    // citydescription = <span className="weatherattribute"> {cityname} CityName: Fremont</span>
                        
    if(weatherdata){
    return(
        <div className="app-container">
            <div className="searchinput"> 
                <input type="input" className="sinput" onChange={handleCity} placeholder="Search For a City"/>
                <button className="searchbutton" onClick={getweather}>Search</button>
            </div>
            <div className="description">
                <div className="citydesc">
                   {citydescription}
                </div>
            </div>
            <div className="weekforecast">
                <ul className="alldays">
                        {weekdaysdata}
                </ul>
            <div>
                <Chart   weatherdata={weatherdata}/>
            </div>
                {extradata}
            </div>
        </div>
    )
    }
}



export default SearchWeatheData