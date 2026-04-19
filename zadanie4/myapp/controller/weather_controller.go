package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"myapp/service"
)

func GetWeather(c echo.Context) error {
	city := c.Param("city")

	data, err := service.GetWeatherByCity(city)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, data)
}