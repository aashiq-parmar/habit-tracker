<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Habit Tracker</title>

    <!-- FullCalendar -->
    <link href="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js"></script>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/calendar.css') }}">
</head>

<body>
    <div class="page-wrapper">
        <div class="calendar-card">

            <!-- HEADER -->
            <div class="calendar-header">
                <div class="header-left">
                    <h1 class="calendar-title">Habit Tracker</h1>
                    <p class="calendar-subtitle">Stay consistent daily</p>
                </div>

                <div class="calendar-topbar">
                    <div class="legend">
                        <div class="legend-item">
                            <span class="legend-dot green"></span> Completed
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot red"></span> Missed
                        </div>
                    </div>

                    <button id="darkToggle" class="dark-toggle" aria-pressed="false" aria-label="Toggle dark mode">
                        🌙 Dark Mode
                    </button>
                </div>
            </div>

            <!-- CALENDAR -->
            <div id="calendar"></div>
        </div>
    </div>

    <script>
        window.doneDates = @json($doneDates);
    </script>

    <script src="{{ asset('js/calendar.js') }}"></script>
</body>

</html>
