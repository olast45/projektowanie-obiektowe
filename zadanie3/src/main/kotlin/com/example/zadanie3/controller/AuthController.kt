package com.example.zadanie3.controller

import com.example.zadanie3.dto.LoginRequest
import com.example.zadanie3.service.AuthService
import org.springframework.web.bind.annotation.*

@RestController
class AuthController() {

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): String {
    if (!AuthService.instance.authenticate(request.username, request.password)) {
        return "Something went wrong!"
    }
        return "Success"
    }
}