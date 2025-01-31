<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViolationReport extends Model
{
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

}
