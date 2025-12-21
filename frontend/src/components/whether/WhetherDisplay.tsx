import React from "react";
import type { WeatherData } from "../../types/weather";

interface WeatherDisplayProps {
  weather: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) {
    return (
      <p className="text-gray-500 text-center mt-4">
        No weather data yet...
      </p>
    );
  }

  return (
    <div className="flex-1 bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 mx-auto text-center bg-gradient-to-r from-blue-100 to-blue-200">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-4">
        {weather.name}
      </h2>

      <div className="flex justify-center items-center gap-6 mb-6">
        <span className="text-6xl">🌡️</span>
        <p className="text-4xl font-bold text-gray-800">
          {Math.round(weather.main.temp - 273.15)}°C
        </p>
      </div>

      <div className="space-y-2 text-lg text-gray-700 font-semibold">
        <p>💨 Wind: {weather.wind.speed} m/s</p>
        <p className="capitalize">☁️ Condition: {weather.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
