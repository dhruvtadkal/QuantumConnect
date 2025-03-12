import React, { useState } from 'react';

// EventRegistration Component: Handles user event registration
const EventRegistration = ({ eventId, eventTitle }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    // Simulate event registration (this will eventually be an API call)
    setIsRegistered(true);
    console.log(`User registered for event: ${eventId} - ${eventTitle}`);
  };

  return (
    <div className="event-registration p-6 bg-neutral-focus rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200">Register for {eventTitle}</h3>
      {isRegistered ? (
        <p className="text-green-400">You are registered for this event.</p>
      ) : (
        <button onClick={handleRegister} className="btn bg-cyan-400 hover:bg-cyan-500 text-white">
          Register
        </button>
      )}
    </div>
  );
};

export default EventRegistration;