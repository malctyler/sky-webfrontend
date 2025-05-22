export interface CurrentWeather {
    description: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    icon: string;
}

export interface WeatherItem {
    dtTxt: string;
    dt_txt?: string; // For backward compatibility
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
    };
}

export interface WeatherForecastResponse {
    items: WeatherItem[];
    city: {
        name: string;
        country: string;
        sunrise: number;
        sunset: number;
    };
}

export interface DailySummary {
    minTemp: number;
    maxTemp: number;
    maxWind: number;
    descriptions: Set<string>;
    icons: Set<string>;
}

export interface DailyForecast {
    date: Date;
    items: WeatherItem[];
    summary: DailySummary;
}

export interface GroupedForecasts {
    [key: string]: DailyForecast;
}
