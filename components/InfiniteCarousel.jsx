import React, { useEffect, useState } from 'react';

const InfiniteCarousel = () => {
  // Sample large dataset for recent news
  const recentNews = [
    {
      title: 'New Research Collaboration Announced',
      summary: 'A groundbreaking research collaboration has been announced between institutions, focusing on the future of AI.',
      date: '2024-10-15',
    },
    {
      title: 'Upcoming Conference on AI',
      summary: 'Join us for a conference on Artificial Intelligence, exploring the latest trends and research.',
      date: '2024-10-10',
    },
    {
      title: 'Grant Opportunities for Environmental Research',
      summary: 'The government has released new grants for environmental research projects aimed at sustainability.',
      date: '2024-10-05',
    },
    {
      title: 'New Quantum Computing Breakthrough',
      summary: 'Researchers have made significant progress in quantum computing, setting a new milestone for the field.',
      date: '2024-10-01',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the infinite scroll effect
  const handleInfiniteScroll = () => {
    const totalItems = recentNews.length;
    const nextIndex = (currentIndex + 1) % totalItems;
    setCurrentIndex(nextIndex);
  };

  // Automatically move to the next item every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(handleInfiniteScroll, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <div className="overflow-hidden w-full relative">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-semibold py-2 m-2">Recent News</h2>
      </div>
      <div
        className="flex w-full transition-transform duration-500 ease-in-out transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {recentNews.map((newsItem, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-64 flex items-center justify-center p-4"
            style={{ minWidth: '100%' }}
          >
            {/* <div className="shadow-lg rounded-lg p-6 max-w-lg text-center bg-gradient-to-r from-lime-200 to-green-200 text-gray-900">

*/}
{/* shadow-lg rounded-lg p-6 max-w-lg text-center bg-gradient-to-r from-yellow-100 to-orange-100 text-gray-900 */}
            <div className="shadow-lg rounded-lg p-6 max-w-lg text-center bg-gradient-to-r from-yellow-100 to-orange-100 text-gray-900">
              <h3 className="text-xl font-bold text-gray-800">{newsItem.title}</h3>
              <p className="text-gray-700 text-lg font-semibold mt-2">
                {newsItem.summary}
              </p>
              <p className="mt-4 text-gray-500 text-sm">Published on: {newsItem.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 pt-4">
        {recentNews.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-cyan-400' : 'bg-gray-300'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default InfiniteCarousel;
