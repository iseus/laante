<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version(),
            'PHP' => phpversion(),
            'DB' => env('DB_CONNECTION'),
        ];
});
