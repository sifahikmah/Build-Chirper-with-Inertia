<?php

namespace App\Http\Controllers;

use App\Models\Chirp;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class ChirpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Chirps/Index', [
            'chirps' => Chirp::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validasi input, termasuk foto (jika ada)
        $validated = $request->validate([
            'message' => 'nullable|string', // Mengizinkan konten HTML
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validasi foto (Max 2 mb)
        ]);

        // Menyimpan foto jika ada
        $photoPath = null;
        if ($request->hasFile('photo')) {
            // Menyimpan foto di folder public/chirps
            $photoPath = $request->file('photo')->store('chirps', 'public');
        }

        // Menyimpan chirp dengan data yang sudah divalidasi, termasuk path foto (jika ada)
        $request->user()->chirps()->create([
            'message' => $validated['message'],
            'photo' => $photoPath, // Menyimpan path foto ke database
        ]);

        return redirect(route('chirps.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Chirp $chirp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chirp $chirp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chirp $chirp): RedirectResponse
    {
        Gate::authorize('update', $chirp);

        $validated = $request->validate([
            'message' => 'required|string',
        ]);

        $chirp->update($validated);

        return redirect(route('chirps.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chirp $chirp): RedirectResponse
    {
        Gate::authorize('delete', $chirp);

        // Hapus foto dari storage jika ada
        if ($chirp->photo) {
            Storage::disk('public')->delete($chirp->photo);
        }

        $chirp->delete();

        return redirect(route('chirps.index'));
    }
}
