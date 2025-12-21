// src/components/AQIDisplay.tsx
import React from "react";
import type { AQIData } from "../../types/aqi";

interface AQIDisplayProps {
  aqi: AQIData | null;
}

const AQIDisplay: React.FC<AQIDisplayProps> = ({ aqi }) => {
  if (!aqi) {
    return <p className="text-gray-500 text-center mt-4">No AQI data yet...</p>;
  }

  const aqiValue = aqi.list[0].main.aqi;
  const components = aqi.list[0].components;

  const aqiLevels = [
    "Good 🌿",
    "Fair 🙂",
    "Moderate 😐",
    "Poor 😷",
    "Very Poor ☠️",
  ];

  return (
    <div className="flex-1 bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-xl p-8 mx-auto h-inherit">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Air Quality Index</h2>
      <p className="text-xl font-semibold text-gray-800">
        AQI: {aqiValue} – {aqiLevels[aqiValue - 1]}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700 font-semibold">
        <p>PM2.5: {components.pm2_5} µg/m³</p>
        <p>PM10: {components.pm10} µg/m³</p>
        <p>O₃: {components.o3} µg/m³</p>
        <p>NO₂: {components.no2} µg/m³</p>
        <p>SO₂: {components.so2} µg/m³</p>
        <p>CO: {components.co} µg/m³</p>
      </div>
    </div>
  );
};

export default AQIDisplay;
