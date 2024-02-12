import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import ErrorBox from '../ErrorBox/ErrorBox';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';


const WeatherBox = props => {
  const apiKey = 'eb51fae72130d0977b7231b25f253116';
  let pending = false;
  const [weather, setWeather] = useState('');
  const [errorInfo, setErrorInfo] = useState('');
  const handleCityChange = useCallback(city => {
    setErrorInfo('');
    pending = true;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };
              pending = false;

              setWeather(weatherData);
            })
        } else {
          setErrorInfo('There is no such city!');
        }
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weather && pending === false && !errorInfo) && <WeatherSummary {...weather} />}
      {pending && <Loader />}
      {errorInfo && <ErrorBox>{errorInfo}</ErrorBox>}
    </section>
  )
};

export default WeatherBox;