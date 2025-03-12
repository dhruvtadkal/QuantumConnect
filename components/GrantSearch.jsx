import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next/client';

const GrantSearch = () => {
  const [grants, setGrants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch grants from the server
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

  // Apply for a grant
  const applyForGrant = async (grantId) => {
    const userId = getCookie('user_id');
    console.log(userId);
    try {
      const response = await fetch('/api/grants/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({grantId, userId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        setError(data.error || 'Failed to apply for the grant.');
      }
    } catch (err) {
      setError('An error occurred while applying for the grant.');
    }
  };

  useEffect(() => {
    fetchGrants();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredGrants = grants.filter((grant) =>
    grant.Grant_Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grant-search p-6 bg-neutral-focus rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Search for Grants</h3>
      <input
        type="text"
        placeholder="Search by grant title"
        value={searchTerm}
        onChange={handleSearch}
        className="input input-bordered w-full mb-4 bg-neutral-focus text-neutral-content"
      />
      {loading && <p className="text-gray-400">Loading grants...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <ul className="list-disc pl-5 text-gray-200">
        {filteredGrants.map((grant) => (
          <li key={grant.Grant_ID} className="mb-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h4 className="text-lg font-bold">{grant.Grant_Title}</h4>
                <p>Deadline: {new Date(grant.Deadline).toISOString().split('T')[0]}</p>
              </div>
              <button
                className="btn bg-cyan-400 hover:bg-cyan-500 text-white mt-2"
                onClick={() => applyForGrant(grant.Grant_ID)}
              >
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrantSearch;
