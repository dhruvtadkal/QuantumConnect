import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    queryType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Send the form data to the backend or display a success message
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-gray-400 text-center">Contact Us</h2>
      
      <div className="mt-10 max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50"
        >
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-neutral-focus text-neutral-content"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-neutral-focus text-neutral-content"
            />
          </div>

          {/* Role Field */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-white">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered w-full bg-neutral-focus text-neutral-content"
            >
              <option value="">Select your role</option>
              <option value="Researcher">Researcher</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
              <option value="Reviewer">Reviewer</option>
            </select>
          </div>

          {/* Query Type Field */}
          <div className="mb-4">
            <label htmlFor="queryType" className="block text-white">Query Type</label>
            <select
              id="queryType"
              name="queryType"
              value={formData.queryType}
              onChange={handleChange}
              className="select select-bordered w-full bg-neutral-focus text-neutral-content"
            >
              <option value="">Select query type</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Event-related">Event-related</option>
              <option value="Grant-related">Grant-related</option>
              <option value="Collaboration Tool">Collaboration Tool</option>
            </select>
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-white">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-neutral-focus text-neutral-content"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn bg-cyan-400 hover:bg-cyan-500 text-white w-full">Send Message</button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-400 text-center">Frequently Asked Questions</h3>
        <div className="mt-8 max-w-3xl mx-auto bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          {/* FAQ 1 */}
          <div className="mb-4">
            <h4 className="font-semibold text-white">1. How do I register for an event?</h4>
            <p className="text-gray-300">
              You can register for an event by visiting the "Events" section. From there, find the event you're interested in and click "Register."
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="mb-4">
            <h4 className="font-semibold text-white">2. How do I apply for a grant?</h4>
            <p className="text-gray-300">
              Navigate to the "Funding and Grants" section to search for available grants. Once you find one that fits your research, click "Apply."
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="mb-4">
            <h4 className="font-semibold text-white">3. Can I collaborate with other researchers?</h4>
            <p className="text-gray-300">
              Yes, through the "Collaboration Tools" section. You can start a chat, upload documents, or participate in forums to discuss and collaborate on projects.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="mb-4">
            <h4 className="font-semibold text-white">4. How can I submit a proposal for a project?</h4>
            <p className="text-gray-300">
              Visit the "Project Proposals" section, fill out the required details, and submit your proposal for review.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="mb-4">
            <h4 className="font-semibold text-white">5. How do I track my thesis submission?</h4>
            <p className="text-gray-300">
              After submitting your thesis through the "Submit Thesis" page, you can track its progress under the "Thesis Submissions" section. You’ll be notified about the review status.
            </p>
          </div>
        </div>
      </div>

          <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-400 text-center">Contact Information</h3>
        <div className="mt-8 max-w-3xl mx-auto bg-neutral p-6 rounded-lg shadow-lg text-neutral-content shadow-cyan-500/50">
          <p className="text-gray-300">
            For any further queries or assistance, feel free to reach out to us at <strong>team@scholarconnect.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;