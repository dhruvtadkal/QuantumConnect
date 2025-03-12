import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-900 text-gray-200 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-gray-100">Thesis Repository</a>
        <nav>
          <ul className="hidden md:flex space-x-4 text-gray-400">
            <li><a href="/" className="hover:text-indigo-400">Home</a></li>
            <li><a href="/search" className="hover:text-indigo-400">Search</a></li>
            <li><a href="/submit-thesis" className="hover:text-indigo-400">Submit Thesis</a></li>
            <li><a href="/peer-review" className="hover:text-indigo-400">Peer Review</a></li>
            <li><a href="/statistics" className="hover:text-indigo-400">Statistics</a></li>
            <li><a href="/about" className="hover:text-indigo-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-indigo-400">Contact</a></li>
          </ul>
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {menuOpen && (
              <ul className="mt-4 space-y-2 text-gray-400">
                <li><a href="/" className="block hover:text-blue-400">Home</a></li>
                <li><a href="/search" className="block hover:text-blue-400">Search</a></li>
                <li><a href="/submit-thesis" className="block hover:text-blue-400">Submit Thesis</a></li>
                <li><a href="/peer-review" className="block hover:text-blue-400">Peer Review</a></li>
                <li><a href="/statistics" className="block hover:text-blue-400">Statistics</a></li>
                <li><a href="/about" className="block hover:text-blue-400">About Us</a></li>
                <li><a href="/contact" className="block hover:text-blue-400">Contact</a></li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
