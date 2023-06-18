import React, { useEffect } from 'react';
import './Weather.css';
import myImage from '../images/new1.png';
import image2 from '../images/new2.png';
import { useState } from 'react';
import axios from 'axios';

const Weather = () => {


    const[city,setcity] = useState(null);
    const[search,setsearch] = useState('mumbai');



    useEffect(()=>{
       /* axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f09ef66d0285af179e7818264f1a5a32`)
        .then(response => {
        setcity(response.data) 
        console.log(response.data)
      })*/

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=f09ef66d0285af179e7818264f1a5a32`);
            setcity(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
  
      fetchData();


    },[search])

  return (
    <div className='outer-container'>
        <div className='main-container'>
            <div className='main-title'>
                <div>Today's report</div>
            </div>
            <div className='search-bar'>
            <i className="fa fa-search" aria-hidden="true"></i>
            <input type='search'  className='input-field' placeholder='Search Places' onChange={(event)=>{setsearch(event.target.value)}}></input>
            </div>
            {!city ? (
                <p>no data found</p>
            ):(
                <div className='outer-rect'>
                <center>
                {city.main.temp>20&&<img src={myImage} alt="My Image" />}
                {city.main.temp<20&&<img src={image2} alt="My Image" />}
                <div className='rect-shape'>
                        <div className='place-text'>{city.name}</div>
                        <div className='temp-text'>{city.main.temp} °</div>
                        <div className='temp-var'>
                            <div>H :{city.main.temp_max} °</div>
                            <div>L :{city.main.temp_min} °</div>
                        </div>
                </div>
                </center>
            </div>
            )}
        </div>
    </div>
  )
}

export default Weather