import React from 'react'
import WeatherFetcher from '../components/whether/whetherFetch'
import AQIFetcher from '../components/aqi/AqiFetch'
import NewsCarousel from '../components/News/NewsDisplay'

const Dashboard:React.FC = () => {
  return (
    <div className=''>
        <div className='text-xl font-bold pl-8 pt-8'>Today Weather:</div>
      <div className='flex justify-start fit-content gap-5'>
      <WeatherFetcher/>
      <AQIFetcher/>
      </div>
      <div>
        <NewsCarousel/>
      </div>
    </div>
  )
}

export default Dashboard
