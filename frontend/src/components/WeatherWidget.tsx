import { useEffect, useState } from "react";
import axios from "axios";

type Weather = {
  city: string;
  temp: number | null;
  date: string;
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/weather?city=Uddevalla");
        setWeather(res.data);
      } catch (err) {
        console.error("Weather error", err);
      }
    })();
  }, []);

  if (!weather) return null;

  const date = new Date(weather.date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="bg-slate-800 text-slate-100 px-4 py-2 rounded-xl shadow inline-flex items-center gap-3 text-sm">
      <span>🌤</span>
      <div>
        <div className="font-semibold">{weather.city}</div>
        <div className="text-xs">
          {date} • {weather.temp != null ? `${weather.temp.toFixed(1)}°C` : "N/A"}
        </div>
      </div>
    </div>
  );
}
