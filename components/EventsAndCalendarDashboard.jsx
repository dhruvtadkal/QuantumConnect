import React, { useState, useEffect } from 'react';
import EventList from './EventList';
import EventCalendar from './EventCalendar';
import EventRegistration from './EventRegistration';

const EventsAndCalendarDashboard = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/user_events`);
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  },[]);

  return (
    <div className="events-calendar-dashboard container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-400 mb-10">Events and Calendar</h2>
      <div className="flex justify-center space-x-4 mb-10">
        <button
          className={`btn ${viewMode === 'list' ? 'bg-cyan-400 hover:bg-cyan-500 text-white' : ''}`}
          onClick={() => setViewMode('list')}
        >
          View Events
        </button>
        <button
          className={`btn ${viewMode === 'calendar' ? 'bg-cyan-400 hover:bg-cyan-500 text-white' : ''}`}
          onClick={() => setViewMode('calendar')}
        >
          Calendar View
        </button>
      </div>

      {/* Loading state */}
      {loading && <p>Loading events...</p>}

      {/* Error state */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Conditionally render EventList or EventCalendar */}
      {viewMode === 'list' && <EventList events={events} onSelectEvent={setSelectedEvent} />}
      {viewMode === 'calendar' && <EventCalendar events={events} onSelectEvent={setSelectedEvent} />}

      {/* Render EventRegistration if an event is selected */}
      {selectedEvent && (
        <EventRegistration eventId={selectedEvent.event_id} eventTitle={selectedEvent.event_title} />
      )}
    </div>
  );
};

export default EventsAndCalendarDashboard;
