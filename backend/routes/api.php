<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::middleware('guest')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/token', [AuthController::class, 'token']);
});

Route::middleware(['auth:sanctum', 'throttle:6,1'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
