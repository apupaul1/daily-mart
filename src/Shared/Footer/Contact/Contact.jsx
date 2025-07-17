import React from 'react';

const Contact = () => {
  return (
    <div className="px-6 py-16 max-w-3xl my-8 rounded-2xl mx-auto text-gray-800 bg-white">
      <h1 className="text-4xl font-bold mb-6 text-neutral text-center">Contact Us</h1>
      <p className="mb-8 text-lg leading-relaxed">
        We'd love to hear from you! Fill out the form below or reach out via email or phone.
      </p>
      <form className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Your Name</label>
          <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
          <textarea rows="5" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
