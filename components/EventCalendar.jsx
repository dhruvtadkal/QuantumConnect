import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Make sure to include CSS

// EventCalendar Component: Displays events in a calendar format
const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API when component mounts or userId changes
  useEffect(() => {
   fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const res = await fetch(`/api/user_events`);
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      console.log(data);
      setEvents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Find events on the selected date
  const eventsOnSelectedDate = events.filter(
    (event) => new Date(event.event_date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="event-calendar p-6 bg-neutral-focus rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Events Calendar</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="mb-4"
      />
      <div>
        {loading && <p className="text-gray-400">Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <h4 className="text-lg font-bold text-gray-300">Events on {selectedDate.toDateString()}:</h4>
        {eventsOnSelectedDate.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-200">
            {eventsOnSelectedDate.map((event) => (
              <li key={event.event_id}>
                <p>{event.event_title}</p>
                <p>Registration Status: {event.registration_status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No events on this date</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
