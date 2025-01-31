<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Chirp;
use App\Models\User;
use App\Models\ViolationReport;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StatisticController extends Controller
{
    public function index(Request $request)
    {
        // Menangani request GET ke halaman statistik admin.
        $timeFilter = $request->query('time', 'daily');

        // Tentukan tanggal mulai berdasarkan filter
        $startDate = match ($timeFilter) {
            'weekly' => Carbon::now()->subWeek(),
            'monthly' => Carbon::now()->subMonth(),
            default => Carbon::create(2025, 2, 1),  // Default (daily) = mencoba apakah filter berjalan
        };


        // Hitung jumlah pengguna aktif yang bukan admin
        $activeUsers = User::where('status', 'active')
                  ->where('role', '!=', 'admin') // Mengecualikan pengguna dengan role 'admin'
                  ->count();

        // Hitung jumlah chirps dalam periode waktu yang dipilih
        $chirpsCount = Chirp::where('created_at', '>=', $startDate)->count();

        // Hitung jumlah violation reports dalam periode waktu yang dipilih
        $violationReports = ViolationReport::where('created_at', '>=', $startDate)->count();

        return inertia('Admin/Statistic', [
            'activeUsers' => $activeUsers,
            'chirpsCount' => $chirpsCount,
            'violationReports' => $violationReports,
        ]);
    }
}

