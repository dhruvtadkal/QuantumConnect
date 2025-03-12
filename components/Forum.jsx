import React, { useState } from 'react';

const Forum = () => {
  const [threads, setThreads] = useState([
    { title: 'Discussion on AI in Healthcare', createdAt: '2024-01-10' },
    { title: 'Collaborating on Renewable Energy Research', createdAt: '2024-01-09' }
  ]);
  const [newThreadTitle, setNewThreadTitle] = useState('');

  const createThread = (e) => {
    e.preventDefault();
    if (newThreadTitle.trim()) {
      const newThread = { title: newThreadTitle, createdAt: new Date().toLocaleDateString() };
      setThreads((prevThreads) => [newThread, ...prevThreads]);
      setNewThreadTitle('');  // Clear input after creating thread
    }
  };

  return (
    <div className="forum p-4 bg-neutral-focus rounded-lg shadow-lg shadow-cyan-500/50">
      <h3 className="text-xl font-bold text-gray-200 mb-4">Project Forum</h3>
      <form onSubmit={createThread}>
        <input
          type="text"
          placeholder="Start a new thread"
          value={newThreadTitle}
          onChange={(e) => setNewThreadTitle(e.target.value)}
          className="input input-bordered w-full mb-4 bg-neutral-focus text-neutral-content"
        />
        <button type="submit" className="btn bg-cyan-400 hover:bg-cyan-500 text-white w-full">Create Thread</button>
      </form>
      <h4 className="mt-4 text-gray-300">Existing Threads:</h4>
      <ul className="list-disc pl-5 text-gray-200">
        {threads.map((thread, index) => (
          <li key={index}>
            {thread.title} <span className="text-sm text-gray-400">(Created on: {thread.createdAt})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;