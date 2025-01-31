<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index()
    {
        // Ambil semua user yang bukan admin
        $users = User::where('role', '!=', 'admin')->withCount('chirps')->get();
        
        // Pastikan data yang dikirimkan dalam format yang diinginkan
        return Inertia::render('Admin/UserManagement', [
            'users' => $users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'chirps_count' => $user->chirps_count,
                    'status' => $user->status,
                ];
            }),
        ]);
    }

    // Deactivate user
    public function deactivate($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found']);
        }

        $user->status = 'inactive';
        $user->save();

        return response()->json(['success' => true, 'status' => 'inactive', 'message' => 'User deactivated successfully']);
    }
    
    // Menghapus pengguna
    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json(['success' => true, 'message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    
    // Mengubah role pengguna
    public function updateUserRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update(['role' => $request->role]); // Update role, misalnya menjadi 'moderator'
        return response()->json(['message' => 'Successfully']);
    }

    //Activate User
    public function activate($id)
    {
        Log::info('Activating user with ID: ' . $id);

        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found']);
        }

        $user->status = 'active';
        $user->save();

        return response()->json(['success' => true, 'status' => 'active', 'message' => 'User activated successfully']);
    }

}
