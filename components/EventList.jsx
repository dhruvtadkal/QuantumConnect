import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next/client';

// EventList Component: Displays a list of upcoming events
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId] = useState(getCookie('user_id'));

  useEffect(() => {
    // Fetch events from the API when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };



    fetchEvents();
  }, []);


  const handleRegister = async (eventID) => {
    if (!currentUserId) {
      alert('Please log in to register for an event.');
      return;
    }
    console.log(eventID)
    try {
      const response = await fetch('/api/register-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: currentUserId, eventID }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Event registered successfully!');
      } else {
        alert('Error registering for the event.');
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Error registering for the event.");
    }
  };

  // If still loading, show a loading message
  if (loading) {
    return <p className="text-gray-200">Loading events...</p>;
  }

  // If there was an error fetching, display the error message
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="event-list p-6 bg-neutral-focus rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Upcoming Events</h3>
      <ul className="list-disc pl-5 text-gray-200">
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.Event_ID} className="mb-2">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold">{event.Event_Title}</h4>
                  <p>Date: {new Date(event.Event_Date).toLocaleDateString()}</p>
                </div>
                <button onClick={()=>handleRegister(event.Event_ID)} className="btn bg-cyan-400 hover:bg-cyan-500 text-white mt-2">Register</button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No events available.</li>
        )}
      </ul>
    </div>
  );
};

export default EventList;
