import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WeatherWidget.module.scss";

const WeatherWidget = ({ city = "Ho Chi Minh" }) => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);

  const API_KEY = process.env.WEATHER_API;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Lấy thời tiết hiện tại
        const currentRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
        );
        setCurrent(currentRes.data);

        // Lấy dự báo 5 ngày
        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=vi`
        );

        // Lọc lấy dữ liệu lúc 12:00 mỗi ngày
        const dailyData = forecastRes.data.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(dailyData);
      } catch (err) {
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeather();
  }, [city]);

  if (!current) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.weatherWidget}>
      {/* Hôm nay */}
      <div className={styles.current}>
        <div className={styles.city}>{current.name}</div>
        <div className={styles.mainInfo}>
          <img
            className={styles.icon}
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt={current.weather[0].description}
          />
          <div className={styles.temp}>{Math.round(current.main.temp)}°C</div>
        </div>
        <div className={styles.desc}>{current.weather[0].description}</div>
        <div className={styles.details}>
          <span>💧 {current.main.humidity}%</span>
          <span>💨 {current.wind.speed} m/s</span>
          <span>
            🌅 {new Date(current.sys.sunrise * 1000).toLocaleTimeString()}
          </span>
          <span>
            🌇 {new Date(current.sys.sunset * 1000).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Dự báo */}
      <div className={styles.forecast}>
        {forecast.map((day, index) => (
          <div key={index} className={styles.day}>
            <div className={styles.date}>
              {new Date(day.dt * 1000).toLocaleDateString("vi-VN", {
                weekday: "short",
                day: "numeric",
                month: "numeric",
              })}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
            />
            <div className={styles.tempRange}>
              {Math.round(day.main.temp_min)}° / {Math.round(day.main.temp_max)}
              °
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
