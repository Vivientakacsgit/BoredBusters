<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/favorite/{userId}', [App\Http\Controllers\FavoriteController::class, 'getFavorites']);
    Route::get('/get-activity-by-condition/{userID}', [App\Http\Controllers\FavoriteController::class, 'getActivityByCondition']);
    Route::get('/get-activity/{activityTitle}', [App\Http\Controllers\FavoriteController::class, 'getActivityByTitle']);
    Route::delete('/favorite/{activityId}', [\App\Http\Controllers\FavoriteController::class, 'deleteActivityById']);
    Route::post('/favorite', [\App\Http\Controllers\FavoriteController::class, 'addActivityById']);
    Route::put('/complete', [\App\Http\Controllers\FavoriteController::class, 'completeById']);
});
Route::Resource('/register', 'App\Http\Controllers\UserController');
Route::post('/login', [UserController::class, 'login']);
//Route::get('login', [ 'as' => 'login', 'uses' => 'App\Http\Controllers\UserController@login']);
