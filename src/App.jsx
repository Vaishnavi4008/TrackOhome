import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {db} from './config';
import { doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBH8a5mEcL5SQz9ZZ2lDPHRvaVueSPJDnc",
  authDomain: "seraphic-alloy-413210.firebaseapp.com",
  projectId: "seraphic-alloy-413210",
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }


function App() {
  const [temperature, setTemperature] = useState(null);
  // const [ptemperature, setpTemperature] = useState(null);


  useEffect(() => {
    // Get a reference to the Firebase Realtime Database service
    const db = getDatabase();
    
    // Reference the location in the database
    const tempRef = ref(db);

    // Set up a listener for real-time updates to the data
    const unsubscribe = onValue(tempRef, (snapshot) => {
      if (snapshot.exists()) {
        // Retrieve the temperature value
        const data = snapshot.val();
        const dataLength = Object.keys(data).length;
        const temperatures = Object.values(data).map(entry => entry.temperature); // Extract all temperatures
        // Set the temperature state with the retrieved value
        setTemperature(temperatures[dataLength-1]); // Assuming there's only one entry
      } else {
        console.log('No data available in the "temperature" node!');
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  

  
  return (
    <div className="App">
      
      <section id="dailyForecast">
<div class="container">

<div class="row justify-content-center searchBar">
<div class="col-10 col-lg-8">
  
  <input type="text" name="locSearchBox" id="locSearchBox" />
</div>
</div>

<div class="row justify-content-around" style={{display:"flex"}}>

<div class="col-10 col-lg-5 tempBox text-center">
  <i class="icon ion-location"></i>
  <p><span class="locName">Your Location Here</span></p>
  <canvas id="weatherIcon" width="100" height="100"></canvas>
  <p class="m0"><span class="weatherCondition">...</span></p>
  <p class="m0"><span class="currentTemp"></span><span class="unit">{temperature}°C</span></p>
  <p class="feels"><i class="wi wi-barometer"></i> Feels Like: <span class="feelsLike">...</span></p>
  <p class="convertToggle">
  {temperature}°C <br/>
  <i class="icon ion-toggle toggleIcon"></i> {((temperature * 9/5) + 32).toFixed(2)}°F
</p>
  <div class="row tempBoxSubInfo">
    <div class="col">
      <p><i class="wi wi-windy"></i>
        Wind Speed: <span class="windSpeed">...</span> km/s
      </p>
    </div>
    <div class="col">
      <p><i class="wi wi-humidity"></i>
        Humidity: <span class="humidity">...</span> %
      </p>
    </div>
  </div>
</div>

<div class="col-12 col-sm-12 col-md-10 col-lg-7 col-xl-6 dashboard text-center">

  <div class="row justify-content-center dashboardDaily">
    <div class="col-3 tempMaxBox">
      <p><i class="icon ion-arrow-graph-up-left"></i><br/>
        <span class="tempMax text-left"></span>
      </p>
    </div>
    <div class="col-6 expect text-center">
      <canvas id="expectIcon" width="80" height="80"></canvas> <br/>
      <p class="text-center thin"><h1>Temperature :</h1>
      <p style={{paddingLeft:"100px",fontSize:"40px"}}>{temperature} °C</p> <span class="todaySummary">...</span></p>
    </div>
    <div class="col-3 tempMinBox">
      <p><span class="tempMin text-right"></span><br/>
        <i class="icon ion-arrow-graph-down-right">...</i>
      </p>
    </div>
  </div>

  <div class="row sunTimes justify-content-center">
    <div class="col sunrise">
      <p><i class="wi wi-sunrise"></i> <span class="sunriseTime"></span></p>
    </div>
    <div class="col sunset">
      <p><i class="wi wi-sunset"></i> <span class="sunsetTime"></span></p>
    </div>
    <div class="col">
      <p><i class="wi wi-day-cloudy-high"></i> <span class="cloudCover"></span></p>
    </div>
    <div class="col">
      <p><i class="wi wi-raindrop"></i> <span class="dewPoint"></span></p>
    </div>
  </div>

  <div class="row weatherQuote text-center">
    <div class="col">
      <p class="quote">"There is no such thing as bad weather, only different kinds of good weather." -John Ruskin</p>
    </div>
  </div>

  <div class="row justify-content-center weeklyButton">
    <div class="col-12 col-md-5 wow fadeInUp" data-wow-delay="0.8s">
      <a href="#weeklyForecast" class="goToWeek">Weekly Forecast <i class="icon ion-ios-arrow-down"></i></a>
    </div>
  </div>

</div>

</div>
  <h3 class="api--error">Looks like the free API key I'm using has reached it's daily limit 😞. <a href="https://faahim.github.io/local-weather-viewer/" target="_blank">Please try this alternate link here.</a></h3>
</div>
</section>

<section id="weeklyForecast">
<div class="container">
<div class="row justify-content-center">
<div class="col-10 text-center">
  <h3>Next Six Days: <span class="weekDaysSummary"></span></h3>
</div>
</div>

<div class="row justify-content-around weekRows">
<div class="col-10 col-lg-5 dayCard text-center wow fadeInUp"  data-wow-delay="0.2s">
  <div class="row">
    <div class="col-5 dayIconHighlight">
      <canvas id="weatherIcon1" width="100" height="100"></canvas>
      <div class="dayMaxMin">
        <p><i class="icon ion-arrow-graph-up-left"></i><span class="weekDayTempMax1"></span>°C</p>
        <p><span class="weekDayTempMin1"></span>°C<i class="icon ion-arrow-graph-down-right"></i></p>
      </div>
    </div>
    <div class="col-7 dayInfoHighlight">
      <div class="row">
        <div class="col-12 weekDay">
          <p class="weekDayName1">Day</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySummary">
          <p class="weekDaySummary1">Days Info</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySun">
          <p><i class="wi wi-sunrise"></i> <span class="weekDaySunrise1"></span> AM</p>
          <p><i class="wi wi-sunset"></i> <span class="weekDaySunset1"></span> PM</p>
        </div>
      </div>
      <div class="row">
        <div class="col weekDayWindnHumidity">
          <p><i class="wi wi-windy"></i> <span class="weekDayWind1"></span> km/s</p>
          <p><i class="wi wi-humidity"></i> <span class="weekDayHumid1"></span>%</p>
          <p><i class="wi wi-day-cloudy-high"></i> <span class="weekDayCloud1"></span>%</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-10 col-lg-5 dayCard text-center wow fadeInUp" data-wow-delay="0.4s">
  <div class="row">
    <div class="col-5 dayIconHighlight">
      <canvas id="weatherIcon2" width="100" height="100"></canvas>
      <div class="dayMaxMin">
        <p><i class="icon ion-arrow-graph-up-left"></i><span class="weekDayTempMax2"></span>°C</p>
        <p><span class="weekDayTempMin2"></span>°C<i class="icon ion-arrow-graph-down-right"></i></p>
      </div>
    </div>
    <div class="col-7 dayInfoHighlight">
      <div class="row">
        <div class="col-12 weekDay">
          <p class="weekDayName2">Day</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySummary">
          <p class="weekDaySummary2">Days Info</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySun">
          <p><i class="wi wi-sunrise"></i> <span class="weekDaySunrise2"></span> AM</p>
          <p><i class="wi wi-sunset"></i> <span class="weekDaySunset2"></span> PM</p>
        </div>
      </div>
      <div class="row">
        <div class="col weekDayWindnHumidity">
          <p><i class="wi wi-windy"></i> <span class="weekDayWind2"></span> km/s</p>
          <p><i class="wi wi-humidity"></i> <span class="weekDayHumid2"></span>%</p>
          <p><i class="wi wi-day-cloudy-high"></i> <span class="weekDayCloud2"></span>%</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<div class="row justify-content-around weekRows">
<div class="col-10 col-lg-5 dayCard text-center wow fadeInUp" data-wow-delay="0.2s">
  <div class="row">
    <div class="col-5 dayIconHighlight">
      <canvas id="weatherIcon3" width="100" height="100"></canvas>
      <div class="dayMaxMin">
        <p><i class="icon ion-arrow-graph-up-left"></i><span class="weekDayTempMax3"></span>°C</p>
        <p><span class="weekDayTempMin3"></span>°C<i class="icon ion-arrow-graph-down-right"></i></p>
      </div>
    </div>
    <div class="col-7 dayInfoHighlight">
      <div class="row">
        <div class="col-12 weekDay">
          <p class="weekDayName3">Day</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySummary">
          <p class="weekDaySummary3">Days Info</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySun">
          <p><i class="wi wi-sunrise"></i> <span class="weekDaySunrise3"></span> AM</p>
          <p><i class="wi wi-sunset"></i> <span class="weekDaySunset3"></span> PM</p>
        </div>
      </div>
      <div class="row">
        <div class="col weekDayWindnHumidity">
          <p><i class="wi wi-windy"></i> <span class="weekDayWind3"></span> km/s</p>
          <p><i class="wi wi-humidity"></i> <span class="weekDayHumid3"></span>%</p>
          <p><i class="wi wi-day-cloudy-high"></i> <span class="weekDayCloud3"></span>%</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-10 col-lg-5 dayCard text-center wow fadeInUp"  data-wow-delay="0.4s">
  <div class="row">
    <div class="col-5 dayIconHighlight">
      <canvas id="weatherIcon4" width="100" height="100"></canvas>
      <div class="dayMaxMin">
        <p><i class="icon ion-arrow-graph-up-left"></i><span class="weekDayTempMax4"></span>°C</p>
        <p><span class="weekDayTempMax4"></span>°C<i class="icon ion-arrow-graph-down-right"></i></p>
      </div>
    </div>
    <div class="col-7 dayInfoHighlight">
      <div class="row">
        <div class="col-12 weekDay">
          <p class="weekDayName4">Day</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySummary">
          <p class="weekDaySummary4">Days Info</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySun">
          <p><i class="wi wi-sunrise"></i> <span class="weekDaySunrise4"></span> AM</p>
          <p><i class="wi wi-sunset"></i> <span class="weekDaySunset4"></span> PM</p>
        </div>
      </div>
      <div class="row">
        <div class="col weekDayWindnHumidity">
          <p><i class="wi wi-windy"></i> <span class="weekDayWind4"></span> km/s</p>
          <p><i class="wi wi-humidity"></i> <span class="weekDayHumid4"></span>%</p>
          <p><i class="wi wi-day-cloudy-high"></i> <span class="weekDayCloud4"></span>%</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<div class="row justify-content-around weekRows">
<div class="col-10 col-lg-5 dayCard text-center wow fadeInUp" data-wow-delay="0.2s">
  <div class="row">
    <div class="col-5 dayIconHighlight">
      <canvas id="weatherIcon5" width="100" height="100"></canvas>
      <div class="dayMaxMin">
        <p><i class="icon ion-arrow-graph-up-left"></i><span class="weekDayTempMax5"></span>°C</p>
        <p><span class="weekDayTempMax5"></span>°C<i class="icon ion-arrow-graph-down-right"></i></p>
      </div>
    </div>
    <div class="col-7 dayInfoHighlight">
      <div class="row">
        <div class="col-12 weekDay">
          <p class="weekDayName5">Day</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySummary">
          <p class="weekDaySummary5">Days Info</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySun">
          <p><i class="wi wi-sunrise"></i> <span class="weekDaySunrise5"></span> AM</p>
          <p><i class="wi wi-sunset"></i> <span class="weekDaySunset5"></span> PM</p>
        </div>
      </div>
      <div class="row">
        <div class="col weekDayWindnHumidity">
          <p><i class="wi wi-windy"></i> <span class="weekDayWind5"></span> km/s</p>
          <p><i class="wi wi-humidity"></i> <span class="weekDayHumid5"></span>%</p>
          <p><i class="wi wi-day-cloudy-high"></i> <span class="weekDayCloud5"></span>%</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-10 col-lg-5 dayCard text-center wow fadeInUp"  data-wow-delay="0.4s">
  <div class="row">
    <div class="col-5 dayIconHighlight">
      <canvas id="weatherIcon6" width="100" height="100"></canvas>
      <div class="dayMaxMin">
        <p><i class="icon ion-arrow-graph-up-left"></i><span class="weekDayTempMax6"></span>°C</p>
        <p><span class="weekDayTempMax6"></span>°C<i class="icon ion-arrow-graph-down-right"></i></p>
      </div>
    </div>
    <div class="col-7 dayInfoHighlight">
      <div class="row">
        <div class="col-12 weekDay">
          <p class="weekDayName6">Day</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySummary">
          <p class="weekDaySummary6">Days Info</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 weekDaySun">
          <p><i class="wi wi-sunrise"></i> <span class="weekDaySunrise6"></span> AM</p>
          <p><i class="wi wi-sunset"></i> <span class="weekDaySunset6"></span> PM</p>
        </div>
      </div>
      <div class="row">
        <div class="col weekDayWindnHumidity">
          <p><i class="wi wi-windy"></i> <span class="weekDayWind6"></span> km/s</p>
          <p><i class="wi wi-humidity"></i> <span class="weekDayHumid6"></span>%</p>
          <p><i class="wi wi-day-cloudy-high"></i> <span class="weekDayCloud6"></span>%</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</section>

<section id="footer">
  <p class="love"><a href="https://darksky.net/poweredby/" target="_blank">Powered by Dark Sky.</a> Made with <i class="icon ion-heart heartbeat"></i> by <a href="https://twitter.com/faahim01" target="_blank">Fahim</a></p>
</section>
    </div>
  );
}

export default App;
