package service

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type WeatherService struct{}

func (s WeatherService) GetWeatherByCity(city string) (map[string]interface{}, error) {
	geoURL := fmt.Sprintf(
		"https://geocoding-api.open-meteo.com/v1/search?name=%s&count=1",
		city,
	)

	geoResp, err := http.Get(geoURL)
	if err != nil {
		return nil, err
	}
	defer geoResp.Body.Close()

	var geoData map[string]interface{}
	json.NewDecoder(geoResp.Body).Decode(&geoData)

	results := geoData["results"].([]interface{})
	first := results[0].(map[string]interface{})

	lat := first["latitude"].(float64)
	lon := first["longitude"].(float64)

	weatherURL := fmt.Sprintf(
		"https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&current_weather=true",
		lat, lon,
	)

	wResp, err := http.Get(weatherURL)
	if err != nil {
		return nil, err
	}
	defer wResp.Body.Close()

	var weatherData map[string]interface{}
	json.NewDecoder(wResp.Body).Decode(&weatherData)

	return weatherData, nil
}