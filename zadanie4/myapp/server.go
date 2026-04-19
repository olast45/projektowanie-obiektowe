package main

import (
	"myapp/controller"
	"myapp/service"

	"github.com/labstack/echo/v4"
)


func main() {
	e := echo.New()
	weather_service := service.WeatherService{}
	weather_controller := &controller.WeatherController{
		Service: weather_service,
	}
	e.GET("/weather/:city", weather_controller.GetWeather)
	e.Start(":8080")
}