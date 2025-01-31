<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Chirp;
use Illuminate\Http\Request;

class ChirpManagementController extends Controller
{
    public function index()
    {
        $chirps = Chirp::with('user')->get();
        return inertia('Admin/ChirpsManagement', ['chirps' => $chirps]);
    }

    public function delete($id)
    {
        $chirp = Chirp::findOrFail($id);
        $chirp->delete();

        return response()->json(['success' => true, 'message' => 'Chirp deleted successfully']);
    }

    public function markForReview($id)
    {
        $chirp = Chirp::findOrFail($id);
        $chirp->update(['status' => 'review']);

        return response()->json(['success' => true, 'message' => 'Chirp marked for review']);
    }
}
