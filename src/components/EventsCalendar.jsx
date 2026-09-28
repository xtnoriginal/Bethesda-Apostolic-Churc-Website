'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CATEGORY_COLORS = {
  Youth: 'bg-blue-600',
  Ruwadzano: 'bg-rose-600',
  Church: 'bg-amber-600',
  BMCU: 'bg-emerald-600',
};
const colorFor = (category) => CATEGORY_COLORS[category] || 'bg-gray-600';

// Local-midnight Date from 'YYYY-MM-DD', so comparisons ignore timezones.
const parseDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function EventsCalendar({ events, onSelectEvent }) {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const parsed = useMemo(
    () =>
      events
        .filter((e) => e.startDate)
        .map((e) => ({
          ...e,
          start: parseDate(e.startDate),
          end: parseDate(e.endDate || e.startDate),
        })),
    [events]
  );

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthStart = new Date(year, monthIndex, 1);
  const monthEnd = new Date(year, monthIndex + 1, 0);

  // 6 weeks x 7 days, starting on the Sunday on/before the 1st.
  const days = Array.from({ length: 42 }, (_, i) => {
    return new Date(year, monthIndex, 1 - monthStart.getDay() + i);
  });
  // Drop a trailing week that belongs entirely to the next month.
  const visibleDays = days[35].getMonth() !== monthIndex ? days.slice(0, 35) : days;

  const eventsOn = (day) => parsed.filter((e) => day >= e.start && day <= e.end);
  const monthEvents = parsed
    .filter((e) => e.start <= monthEnd && e.end >= monthStart)
    .sort((a, b) => a.start - b.start);

  const today = new Date();
  const shiftMonth = (delta) => setMonth(new Date(year, monthIndex + delta, 1));
  const monthLabel = month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b">
        <button
          onClick={() => shiftMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <h2 className="text-lg md:text-xl font-bold" aria-live="polite">
            {monthLabel}
          </h2>
          <button
            onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-full px-3 py-1"
          >
            Today
          </button>
        </div>
        <button
          onClick={() => shiftMonth(1)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 border-b">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {visibleDays.map((day) => {
          const inMonth = day.getMonth() === monthIndex;
          const isToday = sameDay(day, today);
          const dayEvents = eventsOn(day);
          return (
            <div
              key={day.toISOString()}
              className={`min-h-[3.5rem] md:min-h-[6rem] border-b border-r p-1 md:p-2 text-left ${
                inMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 text-xs md:text-sm rounded-full ${
                  isToday ? 'bg-blue-600 text-white font-bold' : ''
                }`}
              >
                {day.getDate()}
              </span>

              {/* Desktop: labelled chips */}
              <div className="hidden md:block space-y-1 mt-1">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onSelectEvent(event)}
                    className={`${colorFor(event.category)} ${
                      inMonth ? '' : 'opacity-60'
                    } block w-full truncate text-left text-white text-xs font-medium rounded px-2 py-0.5 hover:opacity-90`}
                    title={event.title}
                  >
                    {event.title}
                  </button>
                ))}
              </div>

              {/* Mobile: dots */}
              <div className="flex md:hidden flex-wrap gap-1 mt-1">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onSelectEvent(event)}
                    className={`${colorFor(event.category)} w-2 h-2 rounded-full`}
                    aria-label={event.title}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Events this month */}
      <div className="px-4 md:px-6 py-5">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Events in {monthLabel}
        </h3>
        {monthEvents.length === 0 ? (
          <p className="text-gray-500 text-sm">No events scheduled this month.</p>
        ) : (
          <ul className="space-y-2">
            {monthEvents.map((event) => (
              <li key={event.id}>
                <button
                  onClick={() => onSelectEvent(event)}
                  className="w-full flex items-start gap-3 text-left rounded-lg p-2 hover:bg-gray-50"
                >
                  <span className={`${colorFor(event.category)} mt-1.5 w-2.5 h-2.5 rounded-full shrink-0`} />
                  <span className="flex-grow">
                    <span className="block font-medium">{event.title}</span>
                    <span className="flex flex-wrap items-center gap-x-3 text-sm text-gray-600">
                      <span>{event.date}</span>
                      <span className="inline-flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-blue-600" />
                        {event.location}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
