<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ObjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("register", [AuthController::class, "register"]);
Route::post("login", [AuthController::class, "login"]);
Route::post("logout", [AuthController::class, "logout"])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    Route::get('objects', [ObjectController::class, 'index']);
    Route::post('objects/create', [ObjectController::class, 'store']);

    Route::get('my-objects', [ObjectController::class, 'myObjects']);

    Route::put('objects/{id}/update', [ObjectController::class, 'update']);
    Route::delete('objects/{id}', [ObjectController::class, 'destroy']);

});
Route::put('/objects/{id}/status', [ObjectController::class, 'updateStatus'])
    ->middleware(['auth:sanctum', 'isAdmin']);
