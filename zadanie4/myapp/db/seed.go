package db

import (
	"myapp/model"

	"gorm.io/gorm"
)

var initialWeather = []model.Weather{
	{City: "Krakow", Temperature: 12.5},
	{City: "Berlin", Temperature: 10.2},
	{City: "Praga", Temperature: 8.9},
}

func SeedWeather(db *gorm.DB) {
	var count int64
	db.Model(&model.Weather{}).Count(&count)

	if count == 0 {
		weatherList := initialWeather
		db.Create(&weatherList)
	}
}