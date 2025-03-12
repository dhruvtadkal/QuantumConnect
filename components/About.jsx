import React from "react";
import Navbar from "./Navbar"; // Make sure the path is correct

const AboutUs = () => {
  return (
    <div data-theme="dark">
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-400 text-center">
          About Us
        </h2>
        <div className="mt-10 max-w-4xl mx-auto bg-neutral p-8 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          <p className="leading-loose">
            Welcome to Scholar Connect, a platform dedicated to facilitating the management and access of academic theses from various disciplines. 
            Our mission is to support researchers and students by providing a centralized platform for storing, sharing, and collaborating on academic works.
            We aim to foster academic excellence and promote global knowledge sharing by simplifying access to cutting-edge research.
          </p>
          <p className="leading-loose mt-4">
            Scholar Connect allows users to submit, search, and review academic theses and provides features such as peer review, collaboration tools, 
            funding opportunities, and statistical insights to help researchers advance their work.
          </p>
          <p className="leading-loose mt-4">
            We strive to create an ecosystem that encourages collaboration between institutions, researchers, and students worldwide. 
            Thank you for being a part of Scholar Connect, and we hope this platform supports your academic journey.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-400 text-center">
          Meet the Team
        </h2>
        <h2 className="text-3xl font-bold text-gray-400 text-center mt-2">You can reach us: team11@scholarconnect.com</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-neutral p-8 rounded-lg shadow-lg shadow-cyan-500/50 text-neutral-content">
            <h3 className="text-xl font-bold text-gray-400">Mrinal Sunil</h3>
            <p className="mt-2 text-gray-400">Front-End Developer</p>
            <p className="mt-2 text-gray-400">
              Responsible for building interactive user interfaces for Scholar Connect.
            </p>
          </div>
          <div className="bg-neutral p-8 rounded-lg shadow-lg shadow-cyan-500/50 text-neutral-content">
            <h3 className="text-xl font-bold text-gray-400">
              Snigdha Reddy Suram 
            </h3>
            <p className="mt-2 text-gray-400">Back-End Developer</p>
            <p className="mt-2 text-gray-400">
              Focused on developing APIs and database management for seamless user experience.
            </p>
          </div>
          <div className="bg-neutral p-8 rounded-lg shadow-lg shadow-cyan-500/50 text-neutral-content">
            <h3 className="text-xl font-bold text-gray-400">
              Pranay Telukuntla
            </h3>
            <p className="mt-2 text-gray-400">Database Administrator</p>
            <p className="mt-2 text-gray-400">
              In charge of designing and maintaining the database schema for academic theses.
            </p>
          </div>
          <div className="bg-neutral p-8 rounded-lg shadow-lg shadow-cyan-500/50 text-neutral-content">
            <h3 className="text-xl font-bold text-gray-400">
              Dhruv Rajesh Tadkal 
            </h3>
            <p className="mt-2 text-gray-400">Content Manager</p>
            <p className="mt-2 text-gray-400">
              Manages platform content, ensuring quality and consistency in thesis submissions.
            </p>
          </div>
          <div className="bg-neutral p-8 rounded-lg shadow-lg shadow-cyan-500/50 text-neutral-content">
            <h3 className="text-xl font-bold text-gray-400">
              Sai Teja Thaduka
            </h3>
            <p className="mt-2 text-gray-400">Data Analyst</p>
            <p className="mt-2 text-gray-400">
              Provides insights on platform statistics, including views, downloads, and user engagement.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-400 text-center">
          History & Development
        </h2>
        <div className="mt-10 max-w-4xl mx-auto bg-neutral p-8 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          <p className="leading-loose">
            Scholar Connect was conceptualized to address the growing need for a centralized repository of academic research. The platform was designed to streamline
            the management of academic theses, including submission, review, and collaboration tools, all within a structured and easy-to-use interface.
          </p>
          <p className="leading-loose mt-4">
            Using the Entity-Relationship (ER) diagram as the foundation, key entities such as Authors, Users, Thesis, Reviews, and Statistics were modeled to create 
            an efficient database design. Each thesis is associated with authors, reviewers, and submission statistics, ensuring comprehensive management and tracking 
            of research work across the platform.
          </p>
          <p className="leading-loose mt-4">
            The development team collaborated to create both front-end and back-end services. User roles such as Researcher, Reviewer, Content Manager, and Admin 
            were clearly defined, ensuring appropriate access and functionality for each user. The back-end was built with a robust API and relational database, 
            while the front-end provides a seamless user experience with interactive features such as grant applications, event management, and collaboration tools.
          </p>
          <p className="leading-loose mt-4">
            Scholar Connect continues to evolve, integrating advanced features such as real-time collaboration and detailed user analytics to further enhance the 
            academic research experience. The project is a testament to the team's dedication to promoting academic collaboration and innovation.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
