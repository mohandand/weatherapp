import React from 'react';


const CityName = ({weatherdata ,res , cityname }) => {
    var citydescription;
    if(weatherdata.length){

    if(res === "200"){

        citydescription = <span className="weatherattribute">CityName:{weatherdata[0].city}</span>
    }else{
        citydescription = <span className="weatherattribute">Weather data for {cityname} is not available</span>
    }

    }

    return(
        <div className="citydesc">
            {citydescription}
        </div>
    )
}

export default CityName;