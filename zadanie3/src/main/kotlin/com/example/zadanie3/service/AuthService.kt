package com.example.zadanie3.Service

import org.springframework.stereotype.Service

@Service
class AuthService {

    fun authenticate(username: String, password: String): Boolean {
        return username.isNotBlank() && password.isNotBlank()
    }

}