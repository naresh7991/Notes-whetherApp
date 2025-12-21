// src/components/WeatherFetcher.jsx
import React, { useState, useEffect } from "react";
import WeatherDisplay from "./WhetherDisplay";

const WeatherFetcher:React.FC = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/whether/currentWhether`
        );
        const data = await response.json();
        console.log(data.data)
        setWeather(data.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex-1 flex m-4">
      <WeatherDisplay weather={weather} />

    </div>
  );
};

export default WeatherFetcher;
