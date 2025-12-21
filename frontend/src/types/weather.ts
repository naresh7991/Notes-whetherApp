export interface WeatherData { 
    name: string; 
    main: { temp: number; }; 
    wind: { speed: number; }; 
    weather: { description: string; }[]
};