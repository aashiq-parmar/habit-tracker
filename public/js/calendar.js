$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
  },
});

const todayStr = new Date().toISOString().split('T')[0];

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new FullCalendar.Calendar(
    document.getElementById('calendar'),
    {
      initialView: 'dayGridMonth',
      height: '100%',
      fixedWeekCount: true,

      dateClick(info) {
        toggleDay(info.dateStr, info.dayEl);
      },

      dayCellDidMount(info) {
        markCell(info.el, info.dateStr);
      },

      datesSet() {
        document.querySelectorAll('.fc-daygrid-day').forEach(el => {
          markCell(el, el.dataset.date);
        });
      },
    }
  );

  calendar.render();
});

/* ================= DAY MARKING ================= */
function markCell(dayEl, date) {
  if (!date) return;

  const numEl = dayEl.querySelector('.fc-daygrid-day-number');
  if (!numEl) return;

  numEl.innerHTML = ''; // reset
  dayEl.classList.remove('today-day', 'missed-day', 'done-day');

  if (date === todayStr) dayEl.classList.add('today-day');

  if (window.doneDates.includes(date)) {
    dayEl.classList.add('done-day');
    numEl.insertAdjacentHTML('beforeend', checkIcon() + `<span>${parseInt(date.split('-')[2], 10)}</span>`);

    animateIcon(numEl.querySelector('.icon-check'));
  } else if (date < todayStr) {
    dayEl.classList.add('missed-day');
    numEl.insertAdjacentHTML('beforeend', crossIcon() + `<span>${parseInt(date.split('-')[2], 10)}</span>`);

    animateIcon(numEl.querySelector('.icon-cross'));
  } else {
    numEl.textContent = parseInt(date.split('-')[2], 10);
  }
}

/* Animate icon pop */
function animateIcon(iconEl) {
  if (!iconEl) return;
  iconEl.classList.add('animate-pop');
  setTimeout(() => iconEl.classList.remove('animate-pop'), 300);
}

function toggleDay(date, el) {
  $.post('/toggle-day', { date }, res => {
    if (res.is_done) {
      if (!window.doneDates.includes(date)) window.doneDates.push(date);
    } else {
      window.doneDates = window.doneDates.filter(d => d !== date);
    }
    markCell(el, date);
  });
}

function checkIcon() {
  return `<svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20 6L9 17L4 12" stroke="#065f46" />
  </svg>`;
}

function crossIcon() {
  return `<svg class="icon-cross" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 6L18 18M18 6L6 18" stroke="#991b1b" />
  </svg>`;
}

/* ================= DARK MODE TOGGLE ================= */
const toggleBtn = document.getElementById('darkToggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');

  toggleBtn.innerHTML = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  toggleBtn.setAttribute('aria-pressed', isDark.toString());
});
