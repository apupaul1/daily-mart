import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AddHighlights = () => {
    const axiosSecure = useAxiosSecure();

    const { data: ads = [], isLoading, error } = useQuery({
        queryKey: ['highlight-ads', 'approved'],
        queryFn: async () => {
            const res = await axiosSecure.get('/ads?status=approved');
            return res.data;
        },
    });

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        arrows: true,
    };

    if (isLoading) {
        return <p className="text-center mt-10 text-gray-500">Loading ads...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">Error loading ads: {error.message}</p>;
    }

    if (!ads.length) {
        return <p className="text-center text-gray-500">No approved advertisements available.</p>;
    }

    return (
        <div className=''>
            <h2 className="text-3xl font-bold text-center mb-4 text-indigo-600">Advertisement Highlights</h2>

            <div className="shadow-md rounded-md">
                <Slider {...settings}>
                    {ads.map((ad) => (
                        <div key={ad._id} className="px-4 py-6">
                            <div
                                className="rounded-lg shadow-lg bg-cover bg-center h-[400px] flex items-center justify-center text-white"
                                style={{
                                    backgroundImage: `url(${ad.banner})`,
                                }}
                            >
                                <div className="bg-black bg-opacity-50 p-6 rounded-md text-center max-w-xl">
                                    <h3 className="text-2xl font-bold mb-2">{ad.title}</h3>
                                    <p className="text-sm">{ad.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default AddHighlights;
