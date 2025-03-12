import React, { useState, useEffect } from 'react';

// Simulate fetching projects from an API or database
const fetchFeaturedProjects = () => {
  return [
    { 
      title: 'AI-Powered Research Collaboration Platform', 
      description: 'A platform for enabling seamless collaboration between researchers, leveraging AI tools and real-time chat features.',
      link: '/projects/ai-collaboration-platform'
    },
    { 
      title: 'Sustainable Agriculture Through Data Analytics', 
      description: 'A data-driven approach to improving crop yields while reducing environmental impact, using predictive analytics.',
      link: '/projects/sustainable-agriculture'
    },
    { 
      title: 'Blockchain for Secure Academic Record Keeping', 
      description: 'Utilizing blockchain technology to ensure secure and tamper-proof storage of academic records and certifications.',
      link: '/projects/blockchain-academic-records'
    }
  ];
};

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch featured projects (simulated here)
    const fetchedProjects = fetchFeaturedProjects();
    setProjects(fetchedProjects);
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-400 text-center">Featured Projects</h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 text-gray-200 rounded-lg shadow-lg shadow-cyan-500/50 p-6">
            <h3 className="text-xl font-bold text-gray-400">{project.title}</h3>
            <p className="mt-2 text-gray-400">{project.description}</p>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
