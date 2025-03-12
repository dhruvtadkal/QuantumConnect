import React, { useState } from 'react';

const PeerReview = () => {
  // State to hold the list of reviews
  const [reviews, setReviews] = useState([
    { name: 'John Doe', review: 'Great thesis! Well-researched and detailed analysis.', date: 'Sep 10, 2024' }
  ]);

  // State to hold form input values
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const storedData = JSON.parse(localStorage.getItem('user'));
  const role = storedData['role'];
  console.log(`role is ${role}`);
  const isReviewer = role === 'Reviewer';
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new review object
    const newReview = {
      name,
      review,
      date: new Date().toLocaleDateString(),
    };

    // Update the reviews state with the new review
    setReviews([newReview, ...reviews]);

    // Clear form inputs after submission
    setName('');
    setReview('');
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-400">Peer Reviews</h2>

      {/* Reviews List */}
      <div className="mt-10 max-w-2xl mx-auto">
        <div className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-indigo-500/50">
          <h3 className="text-xl font-semibold mb-4 text-white">Recent Reviews</h3>
          <ul className="space-y-4">
            {reviews.map((review, index) => (
              <li key={index} className="bg-neutral-focus p-4 rounded-lg">
                <p className="text-white">
                  <strong>{review.name}:</strong> {review.review}
                </p>
                <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
                <div className="flex flex-row justify-end items-center gap-2">
                  <button className="btn btn-sm btn-secondary border-2 text-slate-100" disabled={!isReviewer}>Edit</button>
                  <button className="btn btn-sm btn-danger" disabled={!isReviewer}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add a New Review Form */}
      <div className="mt-10 max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-indigo-500/50"
        >
          <h3 className="text-xl font-semibold mb-4 text-white">Submit Your Review</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name..."
              className="input input-bordered w-full bg-neutral-focus text-neutral-content"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review" className="block text-white">Your Review</label>
            <textarea
              id="review"
              name="review"
              placeholder="Enter your review..."
              className="textarea textarea-bordered w-full bg-neutral-focus text-neutral-content"
              rows="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Submit Review</button>
        </form>
      </div>
    </section>
  );
};

export default PeerReview;
