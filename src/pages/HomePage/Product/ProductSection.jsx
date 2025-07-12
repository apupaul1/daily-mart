import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ProductSection = () => {

    const [cards, setCards] = useState([]);
    const { loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/marketcards')
            .then(res => setCards(res.data))
            .catch(err => console.error('Error fetching cards:', err))
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div>
            <h1 className='text-center text-4xl font-bold mb-5'>Product Section</h1>
            {
                cards.length <= 0 ? <p className="text-center mt-10">No cards found.</p> :
                    <div className="grid md:grid-cols-3 gap-6 py-8 max-w-7xl mx-auto">
                        {cards.map(card => (
                            <div key={card._id} className="bg-white shadow-md rounded-xl p-4 text-center">
                                <img
                                    src={card.imageUrl}
                                    alt="Product"
                                    className="w-full h-40 object-cover rounded-md mb-3"
                                />
                                <h2 className="text-xl font-bold mb-1">{card.marketName}</h2>
                                <p className="text-sm text-gray-500 mb-2"> {card.date.slice(0, 10)}</p>

                                <ul className="text-sm mb-3">
                                    <li >
                                        {card.itemName} — ৳{card.pricePerUnit}
                                    </li>

                                </ul>

                                <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default ProductSection;