import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxios from '../../../hooks/useAxios';
import { useNavigate } from 'react-router';

const ProductSection = () => {

    const [cards, setCards] = useState([]);
    const { loading, user } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const axios = useAxios()

    useEffect(() => {
        axios.get('/marketcards')
            .then(res => {
                console.log(res.data);
                setCards(res.data)
            })
            .catch(err => console.error('Error fetching cards:', err))
    }, []);

    const handleDetails = (id) => {
        if (!user?.email) {
            navigate('/login');
        } else {
            navigate(`/details/${id}`);
        }
    };


    return (
        <div data-aos='zoom-in-up' >
            <h1 className='text-center text-2xl md:text-4xl font-bold md:mb-5'>Product Section</h1>
            {
                cards.length <= 0 ? <p className="text-center mt-10">No cards found.</p> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 max-w-7xl mx-auto">
                        {cards.map(card => (
                            <div
                                data-aos="fade-down"
                                data-aos-offset="300"
                                data-aos-easing="ease-in-sine"
                                key={card._id}
                                className="bg-white shadow-md rounded-xl p-4 text-center">
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

                                <button
                                    onClick={() => handleDetails(card._id)}
                                    className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
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