package main

import (
	"myapp/controller"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/weather/:city", controller.GetWeather)
	e.Logger.Fatal(e.Start(":8080"))
}