import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FaLink } from 'react-icons/fa'; // Import the link icon from react-icons

const LatestUpdates = () => {
  const [quickLinks, setQuickLinks] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch latest quick links with their respective paths
    const fetchLatestUpdates = () => {
      return [
        { title: "New Collaboration Tools Released: Chat, File Sharing, Forums", path: "/collaborationtools" },
        { title: "Funding and Grants Page Launched", path: "/grantsandfunding" },
        { title: "Events Calendar: Register for Upcoming Webinars", path: "/eventsdashboard" },
        { title: "New Feature: Submit and Track Project Proposals", path: "/proposaldashboard" },
        { title: "System Maintenance Scheduled for October 30th", path: "/eventsdashboard" },
        { title: "Profile Updates: Edit Your Research Interests", path: "/userprofiles" }
      ];
    };

    const updates = fetchLatestUpdates();
    setQuickLinks(updates);
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-400 text-center">Quick Links</h2>
      <div className="mt-10 bg-gray-800 text-gray-200 rounded-lg shadow-lg shadow-cyan-500/50 p-6">
        <ul className="list-disc list-inside mt-4">
          {quickLinks.map((link, index) => (
            <li key={index} className="mt-2 text-gray-400 text-xl flex items-center">
              <FaLink className="mr-2" />
              <Link href={link.path} className="hover:text-cyan-400">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default LatestUpdates;