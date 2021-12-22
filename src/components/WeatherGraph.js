import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const WeatherGraph = ({weatherdata,locerror}) =>{
  let data;
    if(weatherdata.length){
      data = [
        {
          name: weatherdata[0].day,
          Temp: weatherdata[0].temp
        },
        {
          name: weatherdata[1].day,
          Temp: weatherdata[1].temp
        },
        {
          name: weatherdata[2].day,
          Temp: weatherdata[2].temp
        },
        {
          name: weatherdata[3].day,
          Temp: weatherdata[3].temp
        },
        {
          name: weatherdata[4].day,
          Temp: weatherdata[4].temp
        }
      ];
    }
    return(
        
        <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={500}
          height={100}
          data={data}
          margin={{
            top: 15,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal="" vertical="true"/>
          <XAxis dataKey="name" />
          {/* <YAxis /> */}
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Temp" stroke="black" activeDot={{ r: 8 }} /> 
        </LineChart>
      </ResponsiveContainer>
    )
  }

  export default WeatherGraph;