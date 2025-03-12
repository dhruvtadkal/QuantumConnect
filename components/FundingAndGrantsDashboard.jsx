import React, { useState, useEffect } from 'react';
import GrantSearch from './GrantSearch';
import GrantApplicationTracker from './GrantApplicationTracker';

const FundingAndGrantsDashboard = () => {
  const [viewMode, setViewMode] = useState('search');
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
   // Fetch all grants
   const fetchGrants = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/grants');
      const data = await response.json();
      if (response.ok) {
        setGrants(data);
      } else {
        setError(data.error || 'Failed to fetch grants.');
      }
    } catch (err) {
      setError('An error occurred while fetching grants.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user applications
  const fetchApplications = async () => {
    // setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/grants/user_grants');
      const data = await response.json();
      if (response.ok) {
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

  useEffect(() => {
    if (viewMode === 'search') {
      fetchGrants();
    } else if (viewMode === 'tracker') {
      fetchApplications();
    }
  }, [viewMode]);

  return (
    <div className="funding-grants-dashboard container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-400 mb-10">Funding and Grants</h2>
      <div className="flex justify-center space-x-4 mb-10">
        <button
          className={`btn ${viewMode === 'search' ? 'bg-cyan-400 hover:bg-cyan-500 text-white' : ''}`}
          onClick={() => setViewMode('search')}
        >
          Search Grants
        </button>
        <button
          className={`btn ${viewMode === 'tracker' ? 'bg-cyan-400 hover:bg-cyan-500 text-white' : ''}`}
          onClick={() => setViewMode('tracker')}
        >
          My Applications
        </button>
      </div>

      {/* Conditionally render the GrantSearch or GrantApplicationTracker component */}
      {viewMode === 'search' && <GrantSearch />}
      {viewMode === 'tracker' && <GrantApplicationTracker />}
    </div>
  );
};

export default FundingAndGrantsDashboard;