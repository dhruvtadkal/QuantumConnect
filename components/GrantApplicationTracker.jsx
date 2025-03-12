import React, { useState, useEffect } from 'react';

// GrantApplicationTracker Component: Displays grants the user applied for
const GrantApplicationTracker = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Simulated data for user applications (to be replaced by API call)


  useEffect(() => {
    // Simulating an API call to fetch user applications
    const fetchApplications = async () => {
      // setLoading(true);
      setError('');
      try {
        const response = await fetch('/api/grants/user_grants');
        const data = await response.json();
        if (response.ok) {
          console.log(data)
          setApplications(data);
        } else {
          setError(data.error || 'Failed to fetch applications.');
        }
      } catch (err) {
        setError('An error occurred while fetching applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="application-tracker p-6 bg-neutral-focus rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Your Grant Applications</h3>
      <ul className="list-disc pl-5 text-gray-200">
        {applications.map((application) => (
          <li key={application.Grant_ID} className="mb-2">
            <h4 className="text-lg font-bold">{application.Grant_Title}</h4>
            <p>Status: {application.Registration_Status}</p>
            <p>Applied on: {application.Applied_date.split("T")[0]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrantApplicationTracker;