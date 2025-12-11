import type { Request, Response } from "express";

const API_KEY = process.env.WEATHER_API_KEY || process.env.OPENWEATHER_API_KEY;

export async function getWeather(req: Request, res: Response) {
  try {
    if (!API_KEY) {
      return res.status(500).json({
        error: "Missing WEATHER_API_KEY (or OPENWEATHER_API_KEY) in environment."
      });
    }

    const city = (req.query.city as string) || "Uddevalla";

    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("q", city);
    url.searchParams.set("units", "metric");
    url.searchParams.set("appid", API_KEY);

    const r = await fetch(url.toString());
    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: "OpenWeather error", details: text });
    }

    const data: any = await r.json();
    return res.json({
      city: data?.name ?? city,
      temp: data?.main?.temp ?? null,
      date: new Date().toISOString()
    });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Weather fetch failed" });
  }
}
