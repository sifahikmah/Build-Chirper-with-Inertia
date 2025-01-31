<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ViolationReport;
use Illuminate\Http\Request;

class ViolationReportController extends Controller
{
    public function index()
    {
        $reports = ViolationReport::with('reporter')->orderBy('created_at', 'desc')->get();

        return inertia('Admin/ViolationReports', [
            'reports' => $reports,
        ]);
    }

    public function update(Request $request, ViolationReport $report)
    {
        $request->validate([
            'status' => 'required|in:reviewed,resolved',
        ]);

        $report->update(['status' => $request->status]);

        return back()->with('success', 'Report status updated.');
    }

    public function destroy(ViolationReport $report)
    {
        $report->delete();

        return back()->with('success', 'Report deleted.');
    }
}
