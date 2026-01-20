<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjectItem extends Model
{
    use HasFactory;
     protected $fillable = [
        'title',
        'description',
        'image',
        'type',
        'status',
        'location',
        'date',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
