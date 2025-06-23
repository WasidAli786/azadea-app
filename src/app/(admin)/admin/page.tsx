"use client";

import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Eye,
  Thermometer,
  MapPin,
} from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const CITY = "Lahore";

export default function AdminPage() {
  const [weather, setWeather] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const getWeatherIcon = (main: string) => {
    const iconProps = { size: 56, className: "drop-shadow-lg" };

    switch (main.toLowerCase()) {
      case "clear":
        return (
          <Sun
            {...iconProps}
            className="text-yellow-400 animate-spin"
            style={{ animationDuration: "20s" }}
          />
        );
      case "clouds":
        return (
          <Cloud {...iconProps} className="text-gray-400 dark:text-gray-300" />
        );
      case "rain":
        return (
          <CloudRain
            {...iconProps}
            className="text-blue-500 dark:text-blue-400"
          />
        );
      case "snow":
        return <CloudSnow {...iconProps} className="text-blue-200" />;
      default:
        return <Cloud {...iconProps} className="text-white" />;
    }
  };

  if (!weather) {
    return (
      <div className="w-full max-w-md p-6 mx-auto text-center transition-colors duration-300 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl">
        Loading weather...
      </div>
    );
  }

  const {
    name,
    main: { temp, feels_like, humidity, pressure, temp_max, temp_min },
    weather: weatherDetails,
    wind,
    visibility,
  } = weather;

  const condition = weatherDetails[0]?.main || "Clouds";
  const description = weatherDetails[0]?.description || "Cloudy";

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative p-6 overflow-hidden text-white transition-all duration-300 shadow-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-3xl">
        {/* Decorative elements */}
        <div className="absolute w-32 h-32 rounded-full -top-10 -right-10 bg-white/10 dark:bg-white/5"></div>
        <div className="absolute w-24 h-24 rounded-full -bottom-6 -left-6 bg-white/5 dark:bg-white/10"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-white/80 dark:text-gray-300" />
            <span className="text-sm font-medium text-white/90 dark:text-gray-200">
              {name}
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-white dark:text-gray-200">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-white/70 dark:text-gray-400">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>

        {/* Main weather info */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="transition-transform duration-300 transform hover:scale-110">
              {getWeatherIcon(condition)}
            </div>
            <div>
              <div className="mb-1 text-5xl font-thin text-white dark:text-gray-100">
                {Math.round(temp)}°C
              </div>
              <div className="mb-1 text-lg font-medium capitalize text-white/90 dark:text-gray-200">
                {description}
              </div>
              <div className="text-sm text-white/70 dark:text-gray-400">
                H:{Math.round(temp_max)}° L:{Math.round(temp_min)}°
              </div>
            </div>
          </div>
        </div>

        {/* Weather stats */}
        <div className="relative z-10 grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 transition-colors duration-300 bg-white/15 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <Thermometer
                size={18}
                className="text-orange-300 dark:text-orange-400"
              />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                Feels like
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              {Math.round(feels_like)}°C
            </div>
          </div>

          <div className="p-3 transition-colors duration-300 bg-white/15 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <Droplets
                size={18}
                className="text-blue-300 dark:text-blue-400"
              />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                Humidity
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              {humidity}%
            </div>
          </div>

          <div className="p-3 transition-colors duration-300 bg-white/15 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <Wind size={18} className="text-green-300 dark:text-green-400" />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                Wind Speed
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              {Math.round(wind.speed)} km/h
            </div>
          </div>

          <div className="p-3 transition-colors duration-300 bg-white/15 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <Eye size={18} className="text-purple-300 dark:text-purple-400" />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                Visibility
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              {visibility / 1000} km
            </div>
          </div>
        </div>

        {/* UV Index – Placeholder */}
        <div className="relative z-10 p-4 bg-white/15 dark:bg-white/10 backdrop-blur-sm rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white/90 dark:text-gray-200">
              UV Index
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-white dark:text-gray-100">
                --
              </span>
              <span className="text-sm text-white/70 dark:text-gray-400">
                / 10
              </span>
            </div>
          </div>
          <div className="w-full h-3 overflow-hidden rounded-full bg-white/20 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
              style={{ width: `0%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-white/60 dark:text-gray-500">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="p-4 mt-4 transition-colors duration-300 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
        <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {pressure}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pressure (hPa)
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {humidity}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Humidity
            </div>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-600"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round(wind.speed)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Wind (km/h)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
