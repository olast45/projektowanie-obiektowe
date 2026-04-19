package controller

import (
	"myapp/service"

	"github.com/labstack/echo/v4"
)

type WeatherController struct {
	Service service.WeatherService
}

func (wc *WeatherController) GetWeather(c echo.Context) error {
	city := c.Param("city")

	data, err := wc.Service.GetWeatherByCity(city)
	if err != nil {
		return c.JSON(500, err.Error())
	}

	return c.JSON(200, data)
}