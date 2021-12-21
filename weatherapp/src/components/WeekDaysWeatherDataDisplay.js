import React from 'react';

const WeekDaysWeatherDataDisplay = ({weatherdata}) => {

    let weekdaysdata;
    if(weatherdata){ 
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
}
return(<ul  className="alldays"> 
{weekdaysdata}
</ul>);
} 
export default WeekDaysWeatherDataDisplay;