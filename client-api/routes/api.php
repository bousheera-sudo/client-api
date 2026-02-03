<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('articles', \App\Http\Controllers\Api\ArticleController::class);
Route::get('/filter', [\App\Http\Controllers\Api\ArticleController::class, 'filtrer']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
