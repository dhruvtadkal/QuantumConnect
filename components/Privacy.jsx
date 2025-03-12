import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-400 text-center mb-10">Privacy Policy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Information We Collect */}
        <div className="bg-neutral shadow-lg rounded-lg p-6 text-neutral-content shadow-cyan-500/50">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Personal Information:</strong> Information you provide us directly, such as your name, email address, phone number, and any other personal information.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information like IP addresses, browser types, device information, and pages visited.
            </li>
            <li>
              <strong>Cookies & Tracking Technologies:</strong> We use cookies and similar technologies to enhance your experience and gather analytics.
            </li>
          </ul>
        </div>

        {/* Card 2: How We Use Your Information */}
        <div className="bg-neutral shadow-lg rounded-lg p-6 text-neutral-content shadow-cyan-500/50">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside">
            <li>Provide, operate, and maintain our website and services.</li>
            <li>Improve and personalize your experience on our platform.</li>
            <li>Communicate with you and provide customer support.</li>
            <li>Analyze user interactions to improve our services.</li>
            <li>Send marketing emails, newsletters, or promotional offers.</li>
            <li>Comply with legal obligations and resolve disputes.</li>
          </ul>
        </div>

        {/* Card 3: Sharing Your Information */}
        <div className="bg-neutral shadow-lg rounded-lg p-6 text-neutral-content shadow-cyan-500/50">
          <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
          <ul className="list-disc list-inside">
            <li>We do not sell or trade your personal information.</li>
            <li>We may share data with trusted service providers under confidentiality agreements.</li>
            <li>We may share information if required by law or in connection with mergers or acquisitions.</li>
          </ul>
        </div>

        {/* Card 4: Data Security */}
        <div className="bg-neutral shadow-lg rounded-lg p-6 text-neutral-content shadow-cyan-500/50">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>
            We take the security of your personal information seriously and use various security measures to protect your data. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;