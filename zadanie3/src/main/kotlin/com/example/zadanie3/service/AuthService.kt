package com.example.zadanie3.service

import org.springframework.stereotype.Service

class AuthService private constructor() {

    companion object {
        val instance = AuthService() 
    }

    fun authenticate(username: String, password: String): Boolean {
        return username.isNotBlank() && password.isNotBlank()
    }
}