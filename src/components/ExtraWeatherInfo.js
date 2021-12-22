import React from 'react'

const ExtraWeatherInfo = ({weatherdata}) => {
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
                      </div>
                    </div>;
               }   
    return(
        <div>
            {extradata}
        </div>

          )
}

export default ExtraWeatherInfo;