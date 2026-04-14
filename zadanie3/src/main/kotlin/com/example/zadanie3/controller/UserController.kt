package com.example.zadanie3.controller

import com.example.zadanie3.model.User
import org.springframework.web.bind.annotation.*


@RestController
class UserController() {

    private val users = listOf(
        User(1, "Anna", "Smith", "annasmith@gmail.com"),
        User(2, "Bob", "Park", "bob@example.com")
    )

    @GetMapping("/users")
    fun getUsers(): List<User> {
        return users
    }
}