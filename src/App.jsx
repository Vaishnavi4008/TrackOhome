import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "./config";
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
        const temperatures = Object.values(data).map(
          (entry) => entry.temperature
        ); // Extract all temperatures
        // Set the temperature state with the retrieved value
        setTemperature(temperatures[dataLength - 1]); // Assuming there's only one entry
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

          <div class="row justify-content-around" style={{ display: "flex" }}>
            <div class="col-10 col-lg-5 tempBox text-center">
              <i class="icon ion-location"></i>
              <p>
                <span class="locName">Your Location Here</span>
              </p>
              <canvas id="weatherIcon" width="100" height="100"></canvas>
              <p class="m0">
                <span class="weatherCondition">...</span>
              </p>
              <p class="m0">
                <span class="currentTemp"></span>
                <span class="unit">{temperature}°C</span>
              </p>
              <p class="feels">
                <i class="wi wi-barometer"></i> Feels Like:{" "}
                <span class="feelsLike">...</span>
              </p>
              <p class="convertToggle">
                {temperature}°C <br />
                <i class="icon ion-toggle toggleIcon"></i>{" "}
                {((temperature * 9) / 5 + 32).toFixed(2)}°F
              </p>
              <div class="row tempBoxSubInfo">
                <div class="col">
                  <p>
                    <i class="wi wi-windy"></i>
                    Wind Speed: <span class="windSpeed">...</span> km/s
                  </p>
                </div>
                <div class="col">
                  <p>
                    <i class="wi wi-humidity"></i>
                    Humidity: <span class="humidity">...</span> %
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-12 col-md-10 col-lg-7 col-xl-6 dashboard text-center">
              <div class="row justify-content-center dashboardDaily">
                <div class="col-3 tempMaxBox">
                  <p>
                    <i class="icon ion-arrow-graph-up-left"></i>
                    <br />
                    <span class="tempMax text-left"></span>
                  </p>
                </div>
                <div class="col-6 expect text-center">
                  <canvas id="expectIcon" width="80" height="80"></canvas>{" "}
                  <br />
                  <p class="text-center thin">
                    <h1>Temperature :</h1>
                    <p style={{ paddingLeft: "100px", fontSize: "40px" }}>
                      {temperature} °C
                    </p>{" "}
                    <span class="todaySummary">...</span>
                  </p>
                </div>
                <div class="col-3 tempMinBox">
                  <p>
                    <span class="tempMin text-right"></span>
                    <br />
                    <i class="icon ion-arrow-graph-down-right">...</i>
                  </p>
                </div>
              </div>

              <div class="row sunTimes justify-content-center">
                <div class="col sunrise">
                  <p>
                    <i class="wi wi-sunrise"></i>{" "}
                    <span class="sunriseTime"></span>
                  </p>
                </div>
                <div class="col sunset">
                  <p>
                    <i class="wi wi-sunset"></i>{" "}
                    <span class="sunsetTime"></span>
                  </p>
                </div>
                <div class="col">
                  <p>
                    <i class="wi wi-day-cloudy-high"></i>{" "}
                    <span class="cloudCover"></span>
                  </p>
                </div>
                <div class="col">
                  <p>
                    <i class="wi wi-raindrop"></i>{" "}
                    <span class="dewPoint"></span>
                  </p>
                </div>
              </div>

              <div class="row weatherQuote text-center">
                <div class="col">
                  <p class="quote">
                    "There is no such thing as bad weather, only different kinds
                    of good weather." -John Ruskin
                  </p>
                </div>
              </div>

              <div class="row justify-content-center weeklyButton">
                <div class="col-12 col-md-5 wow fadeInUp" data-wow-delay="0.8s">
                  <a href="#weeklyForecast" class="goToWeek">
                    Weekly Forecast <i class="icon ion-ios-arrow-down"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h3 class="api--error">
            Looks like the free API key I'm using has reached it's daily limit
            😞.{" "}
            <a
              href="https://faahim.github.io/local-weather-viewer/"
              target="_blank"
            >
              Please try this alternate link here.
            </a>
          </h3>
        </div>
      </section>

      <section id="footer">
        <p class="love">
          <a href="https://darksky.net/poweredby/" target="_blank">
            Powered by Dark Sky.
          </a>{" "}
          Made with <i class="icon ion-heart heartbeat"></i> by{" "}
          <a href="https://twitter.com/faahim01" target="_blank">
            Fahim
          </a>
        </p>
      </section>
    </div>
  );
}

export default App;
