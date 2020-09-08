<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');

Route::get('me', 'AuthController@me');

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
});

// User Profile
Route::post('change-password', 'UserProfileController@changePassword')->name('change.password');
Route::post('change-name', 'UserProfileController@changeName')->name('change.name');
Route::post('change-email', 'UserProfileController@changeEmail')->name('change.email');
Route::post('upload-profile-image', 'UploadController@uploadUserProfileImage')->name('upload.profile.image');
Route::post('upload-forest-issue-image', 'UploadController@uploadForestIssueImage')->name('upload.forest.issue.image');

// User CRUD
Route::post('users/create', 'UserController@store');
Route::get('users', 'UserController@index');
Route::post('users/edit/{id}', 'UserController@update');
Route::get('users/delete/{id}', 'UserController@destroy');

// Forest CRUD
Route::get('forests', 'ForestController@index');
Route::get('forests/coordinates', 'ForestController@coordinates');
Route::get('forests/names', 'ForestController@forestsName');
Route::get('forest/{id}', 'ForestController@show');
Route::get('forest/delete/{id}', 'ForestController@destroy');
Route::post('forest/edit/{id}', 'ForestController@update');
Route::post('forest/create', 'ForestController@store');

// Forest Event CRUD
Route::get('forestEvents', 'ForestEventController@index');
Route::get('forestEvent/delete/{id}', 'ForestEventController@destroy');
Route::post('forestEvent/edit/{id}', 'ForestEventController@update');
Route::post('forestEvent/create', 'ForestEventController@store');
Route::get('forestEvents/{id}', 'ForestEventController@show');

// Forest Event History
Route::get('forestEventHistory/{id}', 'ForestEventHistoryController@show');

// Forest Type CRUD
Route::get('forestType', 'ForestTypeController@index');
Route::get('forestType/delete/{id}', 'ForestTypeController@destroy');
Route::post('forestType/edit{id}', 'ForestTypeController@update');
Route::post('forestType/create', 'ForestTypeController@store');

// Tree Type CRUD
Route::get('treeType', 'TreeTypeController@index');
Route::get('treeType/delete/{id}', 'TreeTypeController@destroy');
Route::post('treeType/edit/{id}', 'TreeTypeController@update');
Route::post('treeType/create', 'TreeTypeController@store');

// Users Type
Route::get('usersType', 'UserTypeController@index');

// User Forest Request
Route::post('forestAccess', 'UserForestRequestController@requestForestAccess');
Route::get('checkRequest', 'UserForestRequestController@checkIfRequestWasSent');
Route::get('accessRequests', 'UserForestRequestController@index');
Route::get('declineRequest/{id}', 'UserForestRequestController@destroy');
Route::get('confirmRequest/{id}', 'UserForestRequestController@update');

// Forest Statistics
Route::post('forestStatistics', 'ForestStatisticsController@showStatistics');
Route::post('forestTreeTypeProblemStatistics', 'ForestStatisticsController@forestTreeTypeProblemStatistics');

// user Statistics
Route::get('adminReportsStatistics/{userID}', 'UserStatisticsController@getAdminReportsStatistics');
Route::get('foresterIssuesStatistics/{userID}', 'UserStatisticsController@getForesterIssuesStatistics');
Route::get('userStatistics/{userID}', 'UserStatisticsController@getUserStatistics');

// Forest Problems
Route::get('forestProblems', 'ForestProblemController@index');
