<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CalendarDay;
use Carbon\Carbon;

class CalendarController extends Controller
{
    public function index()
    {
        $doneDates = CalendarDay::where('is_done', 1)
            ->pluck('date')
            ->map(fn($d) => Carbon::parse($d)->format('Y-m-d'))
            ->toArray();

        return view('calendar', compact('doneDates'));
    }

    public function toggle(Request $request)
    {
        $day = CalendarDay::firstOrCreate(['date' => $request->date]);
        $day->is_done = !$day->is_done;
        $day->save();

        return response()->json($day);
    }
}
