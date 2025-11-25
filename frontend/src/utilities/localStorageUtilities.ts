import { WeatherData } from "@/services/weatherService";

const STORAGE_KEY = "savedWeathers";

export function saveWeathersToLocalStorage(data: WeatherData[]) {
  if (typeof window === "undefined") return; // solo en cliente
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getWeathersFromLocalStorage(): WeatherData[] {
  if (typeof window === "undefined") return []; // evita error en build/SSR
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
