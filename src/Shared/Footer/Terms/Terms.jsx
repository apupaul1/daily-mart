import React from 'react';

const Terms = () => {
  return (
    <div className="px-6 py-16 rounded-2xl max-w-5xl mx-auto text-gray-800 my-8 bg-white">
      <h1 className="text-4xl font-bold mb-6 text-neutral text-center">Terms & Conditions</h1>
      <p className="mb-4 text-lg leading-relaxed">
        By using our services, you agree to the following terms and conditions. Please read them carefully before using the platform.
      </p>
      <ul className="list-disc pl-6 mb-6 text-lg leading-relaxed space-y-2">
        <li>You must be at least 13 years old to use our services.</li>
        <li>All content provided is for informational purposes only.</li>
        <li>We are not responsible for any third-party content or links.</li>
        <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
        <li>We reserve the right to modify these terms at any time.</li>
      </ul>
      <p className="text-lg leading-relaxed">
        If you have any questions about our Terms & Conditions, please contact us.
      </p>
    </div>
  );
};

export default Terms;
