<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chirp extends Model
{
    // Mendefinisikan atribut mana yang dapat diisi secara massal (disini hanya kolom 'message')
        protected $fillable = [
        'message',
    ];
    // Mendefinisikan relasi Chirp's user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
