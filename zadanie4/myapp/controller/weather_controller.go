package controller

import (
	"net/http"
	"myapp/model"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type WeatherController struct {
	DB *gorm.DB
}

func (wc *WeatherController) GetWeather(c echo.Context) error {
	city := c.Param("city")

	var weather model.Weather

	result := wc.DB.Where("city = ?", city).First(&weather)
	if result.Error != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "City not found",
		})
	}

	return c.JSON(http.StatusOK, weather)
}