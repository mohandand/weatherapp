import React from 'react';


const CityName = ({weatherdata ,res , cityname ,locerror}) => {
    var citydescription;
    if(weatherdata.length){

    if(locerror=="1"){
        citydescription = <span className="weatherattribute">Please Allow Access</span>
    }

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