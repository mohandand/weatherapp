import React, { useState } from 'react';

var data = require('./cities.json');

const SearchResult = ({cityname, parentCallback}) => {

    var count =0 ;

if(cityname.length>2)
{
    var example="Fremont";
    let result = [];
    result = data.filter((item)=>{

            return (item.toLowerCase()).includes(cityname.toLowerCase());
    })

    let setCityToParent = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('data-value'));
        parentCallback(event.target.getAttribute('data-value') ,"searchdisable");
    }

return( 
  <div className="searchresults">

            {result.map((products) => {
                count++;
                if(count<5){
                 return (
                            <div className="searchresults1" onClick={setCityToParent} data-value={products}>
                              {products}<br></br>
                            </div>
                      )
                 }
                  })}

  </div>
   
);
        }
        else{
            return(
                <div>
                </div>
            );   

        }
}
export default SearchResult;