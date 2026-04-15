package com.example.zadanie3.controller

import com.example.zadanie3.dto.LoginRequest
import com.example.zadanie3.service.AuthService
import org.springframework.web.bind.annotation.*
import org.springframework.beans.factory.annotation.Autowired

@RestController
class AuthController @Autowired constructor(private val authService: AuthService) {

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): String {
    if (!authService.authenticate(request.username, request.password)) {
        return "Something went wrong!"
    }
        return "Success"
    }
}