<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

Route::middleware('guest')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('/reset-password', [NewPasswordController::class, 'store']);
    Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
});

Route::middleware(['auth', 'throttle:6,1'])->group(function () {
    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)->middleware('signed');
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});
