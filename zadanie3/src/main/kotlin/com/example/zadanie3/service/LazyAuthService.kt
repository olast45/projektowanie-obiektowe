package com.example.zadanie3.service

import org.springframework.stereotype.Service
import org.springframework.context.annotation.Lazy

@Lazy
@Service
class LazyAuthService {

    fun authenticate(username: String, password: String): Boolean {
        return username.isNotBlank() && password.isNotBlank()
    }
}