import apiClient from './apiClient';
import { CurrentWeather, WeatherForecastResponse } from '../types/weather';

export const weatherService = {
    getCurrentWeather: async (): Promise<CurrentWeather> => {
        const response = await apiClient.get<CurrentWeather>('/Weather');
        return response.data;
    },

    getFiveDayForecast: async (): Promise<WeatherForecastResponse> => {
        const response = await apiClient.get<WeatherForecastResponse>('/Weather/forecast');
        return response.data;
    }
};

export default weatherService;
