<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarDay extends Model
{
    use HasFactory;

    // Specify the table name if it's not following the default plural convention
    protected $table = 'calendar_days';

    // Allow mass assignment for 'date' and 'is_done'
    protected $fillable = ['date', 'is_done'];

    protected $casts = [
        'date' => 'date:Y-m-d', // ensures date format exactly YYYY-MM-DD
        'is_done' => 'boolean'
    ];
}
