// src/components/AQIFetcher.tsx
import React, { useState, useEffect } from "react";
import type { AQIData } from "../../types/aqi";
import AQIDisplay from "./AqiDisplay";


const AQIFetcher: React.FC = () => {
  const [aqi, setAqi] = useState<AQIData | null>(null);

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        // Example: Delhi coordinates (lat: 28.7041, lon: 77.1025)
        const response = await fetch(
          `http://localhost:4000/api/whether/currentAQI`
        );
        const data = await response.json();
        setAqi(data.data);
      } catch (error) {
        console.error("Error fetching AQI:", error);
      }
    };

    fetchAQI();
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center m-4">
      <AQIDisplay aqi={aqi} />
    </div>
  );
};

export default AQIFetcher;
