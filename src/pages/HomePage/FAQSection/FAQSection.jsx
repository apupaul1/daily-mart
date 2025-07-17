import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import FAQ1 from '../../../assets/FAQ1.jpg'
import FAQ2 from '../../../assets/FAQ2.jpg'


const faqs = [
    {
        question: "How does Daily Price Tracker collect market prices?",
        answer: "Local vendors submit prices daily through their dashboards. Admins review and approve the data before it's shown publicly.",
    },
    {
        question: "Do I need to create an account to view product prices?",
        answer: "You can view basic info publicly, but you'll need to log in to see full product details, write reviews, and add items to your watchlist.",
    },
    {
        question: "Is the pricing data real-time and reliable?",
        answer: "Yes. Prices are updated daily by verified vendors and approved by platform admins to ensure accuracy.",
    },
    {
        question: "Can I buy products directly from the website?",
        answer: "Yes! You can purchase selected products via Stripe after logging in.",
    },
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <section className="bg-gradient-to-br from-green-50 to-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 lg:py-32 w-full max-w-8xl mx-auto shadow-lg mb-12">
            <div className='flex flex-col lg:flex-row gap-1'>


                <div className='flex-1 flex flex-col lg:flex-row gap-3 lg:relative  items-center'>

                    <img className='md:w-[300px] lg:w-[300px] flex-1 rounded-[40px] lg:absolute lg:-top-10 lg:left-16' src={FAQ1} alt="" />

                    <img className='hidden md:w-[300px] lg:flex lg:w-[300px] flex-1 rounded-[40px] border-t-8 border-t-white border-l-white border-l-8 lg:absolute lg:right-32 lg:top-8' src={FAQ2} alt="" />
                </div>


                <div className="space-y-5 flex-1">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-600 mb-10 sm:mb-12">
                        <span role="img" aria-label="question mark"></span> Frequently Asked Questions
                    </h2>

                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border- border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out 
            ${activeIndex === index ? 'shadow-md ring-2 ring-green-400 bg-white' : 'shadow-sm hover:shadow-md'}
            `}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className={`flex justify-between items-center w-full text-left px-4 sm:px-6 py-4 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2
 transition-colors duration-200 ease-in-out
              ${activeIndex === index ? 'bg-green-100 text-green-800' : 'bg-white text-gray-800 hover:bg-gray-50'}
              `}
                            >
                                <span className="text-base sm:text-lg font-semibold w-11/12">{faq.question}</span>
                                <motion.span
                                    initial={false}
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeIndex === index ? (
                                        <FaChevronUp className="text-green-600 text-xl" />
                                    ) : (
                                        <FaChevronDown className="text-gray-500 text-xl" />
                                    )}
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        key="answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-4 sm:px-6 pb-5 pt-2"
                                    >
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default FAQSection;
