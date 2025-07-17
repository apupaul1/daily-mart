import React from 'react';

const About = () => {
    return (
        <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800 bg-white  my-8 rounded-2xl">
            <h1 className="text-4xl font-bold mb-16 text-neutral text-center">About Us</h1>
            <p className="mb-4 text-lg leading-relaxed">
                Welcome to our platform! We are dedicated to providing accurate and up-to-date information to help users make informed decisions.
                Our mission is to create transparent, user-friendly experiences powered by the latest technology.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
                Our team consists of passionate developers, designers, and analysts who believe in the power of community and innovation.
                We strive to keep improving and delivering exceptional value through our products.
            </p>
            <p className="text-lg leading-relaxed">
                Thank you for being a part of our journey!
            </p>
        </div>
    );
};

export default About;
