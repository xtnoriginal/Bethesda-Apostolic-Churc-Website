// Builds iCalendar (RFC 5545) files from the event data in src/data/events.js.
// Pure and dependency-free so it runs both in the /events/calendar.ics route
// and in the browser for the per-event "Add to calendar" download.
//
// Events are all-day and multi-day, so they use VALUE=DATE. DTEND is
// exclusive in iCalendar: a conference ending 10 August needs DTEND 20250811.

const PRODID = '-//Bethesda Apostolic Church//Events//EN';
const CAL_NAME = 'Bethesda Apostolic Church Events';

/** 'YYYY-MM-DD' -> 'YYYYMMDD' */
function icsDate(isoDate) {
  return isoDate.replace(/-/g, '');
}

/** 'YYYY-MM-DD' -> the following day as 'YYYYMMDD' (UTC math, no DST drift). */
function nextDay(isoDate) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

function icsTimestamp(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function escapeText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

// Lines longer than 75 octets must be folded with CRLF + a single space.
function fold(line) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const parts = [];
  let current = '';
  let currentBytes = 0;
  for (const char of line) {
    const size = new TextEncoder().encode(char).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (currentBytes + size > limit) {
      parts.push(current);
      current = '';
      currentBytes = 0;
    }
    current += char;
    currentBytes += size;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

function eventLines(event, { url } = {}) {
  const end = event.endDate || event.startDate;
  return [
    'BEGIN:VEVENT',
    `UID:event-${event.id}@bethesda-apostolic-church`,
    `DTSTAMP:${icsTimestamp()}`,
    `DTSTART;VALUE=DATE:${icsDate(event.startDate)}`,
    `DTEND;VALUE=DATE:${nextDay(end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(`${event.location}, Zimbabwe`)}`,
    event.category && `CATEGORIES:${escapeText(event.category)}`,
    url && `URL:${url}`,
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
  ].filter(Boolean);
}

/**
 * @param {Array} events  entries shaped like src/data/events.js
 * @param {{ url?: string }} options  link back to the events page
 */
export function buildCalendar(events, options = {}) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${CAL_NAME}`,
    'X-WR-TIMEZONE:Africa/Harare',
    ...events.filter((e) => e.startDate).flatMap((e) => eventLines(e, options)),
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

/** Browser-only: save an .ics file for one or more events. */
export function downloadCalendar(events, filename, options) {
  const blob = new Blob([buildCalendar(events, options)], {
    type: 'text/calendar;charset=utf-8',
  });
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

/** Pre-filled "add to Google Calendar" link for a single event. */
export function googleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${icsDate(event.startDate)}/${nextDay(event.endDate || event.startDate)}`,
    details: event.description,
    location: `${event.location}, Zimbabwe`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
