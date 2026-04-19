package main

import (
	"myapp/controller"
	"myapp/db"
	"myapp/model"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	database, err := gorm.Open(sqlite.Open("weather.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	database.AutoMigrate(&model.Weather{})

	db.SeedWeather(database)

	e := echo.New()

	wc := &controller.WeatherController{DB: database}

	e.GET("/weather/:city", wc.GetWeather)
	e.Logger.Fatal(e.Start(":8080"))
}