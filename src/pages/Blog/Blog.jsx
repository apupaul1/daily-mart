import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faAppleAlt, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";

const blogs = [
  {
    title: "Top 10 Grocery Tips for Busy People",
    excerpt: "Learn how to save time and money while shopping for your daily groceries...",
    image: "https://source.unsplash.com/400x250/?grocery,shopping",
    icon: faCartShopping,
    link: "#",
  },
  {
    title: "How to Find Fresh Produce in Local Markets",
    excerpt: "Discover the best ways to select fresh fruits and vegetables in your area...",
    image: "https://source.unsplash.com/400x250/?vegetables,market",
    icon: faLeaf,
    link: "#",
  },
  {
    title: "Healthy Eating on a Budget",
    excerpt: "Simple strategies to eat healthy without breaking the bank...",
    image: "https://source.unsplash.com/400x250/?healthy,food",
    icon: faHeart,
    link: "#",
  },
  {
    title: "Seasonal Fruits You Should Try",
    excerpt: "Explore the seasonal fruits available in your local markets and their benefits...",
    image: "https://source.unsplash.com/400x250/?fruits,market",
    icon: faAppleAlt,
    link: "#",
  },
    {
    title: "Seasonal Fruits You Should Try",
    excerpt: "Explore the seasonal fruits available in your local markets and their benefits...",
    image: "https://source.unsplash.com/400x250/?fruits,market",
    icon: faAppleAlt,
    link: "#",
  },
    {
    title: "Seasonal Fruits You Should Try",
    excerpt: "Explore the seasonal fruits available in your local markets and their benefits...",
    image: "https://source.unsplash.com/400x250/?fruits,market",
    icon: faAppleAlt,
    link: "#",
  },
];

const Blog = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Blog
      </h1>

      {/* Blog Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {/* Blog Image */}
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />

            {/* Blog Content */}
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FontAwesomeIcon icon={blog.icon} className="text-blue-500 text-xl" />
                <h2 className="text-xl font-semibold">{blog.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <a
                href={blog.link}
                className="text-blue-500 font-semibold hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
