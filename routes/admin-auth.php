<?php

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use App\Http\Controllers\Admin\ChirpManagementController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\ViolationReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Routes untuk Admin Guest (belum login)
Route::prefix('admin')->middleware('guest:admin')->group(function () {
    // Register routes
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('admin.register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    // Login routes
    Route::get('login', [LoginController::class, 'create'])
        ->name('admin.login');
    Route::post('login', [LoginController::class, 'store']);
});

// Routes untuk Admin Authenticated (sudah login)
Route::prefix('admin')->middleware('auth:admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // User Management
    Route::get('/user-management', [UserManagementController::class, 'index'])
        ->name('admin.user-management');
    Route::post('/user-management/deactivate/{id}', [UserManagementController::class, 'deactivate'])
        ->name('admin.user-management.deactivate');
    Route::post('/user-management/delete/{id}', [UserManagementController::class, 'deleteUser'])
        ->name('admin.user-management.delete');
    Route::post('/user-management/update-role/{id}', [UserManagementController::class, 'updateUserRole'])
        ->name('admin.user-management.update-role');
    Route::post('/user-management/activate/{id}', [UserManagementController::class, 'activate']);


    // Chirp Management
    Route::get('/chirps-management', [ChirpManagementController::class, 'index'])
        ->name('admin.chirps-management'); 
    Route::post('/chirps-management/delete/{id}', [ChirpManagementController::class, 'delete'])
        ->name('admin.chirps-management.delete'); 
    Route::post('/chirps-management/mark/{id}', [ChirpManagementController::class, 'markForReview'])
        ->name('admin.chirps-management.mark'); 

    
    // Violation Reports Management
    Route::get('/violation-reports', [ViolationReportController::class, 'index'])
        ->name('admin.violation-reports');
    Route::patch('/violation-reports/{report}', [ViolationReportController::class, 'update'])
        ->name('admin.violation-reports.update');
    Route::delete('/violation-reports/{report}', [ViolationReportController::class, 'destroy'])
        ->name('admin.violation-reports.delete');

    // Statistic & Activity
    Route::get('/statistics', [StatisticController::class, 'index'])->name('admin.statistics');

    // Logout
    Route::post('admin/logout', [LoginController::class, 'destroy'])
        ->name('admin.logout');
});
