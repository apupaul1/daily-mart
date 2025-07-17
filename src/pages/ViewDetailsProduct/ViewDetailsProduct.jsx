import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';

// React Icons
import {
  FaArrowLeft,
  FaHeart,
  FaStore,
  FaUserTie,
  FaEnvelope,
  FaCalendarAlt,
  FaClipboardCheck,
  FaBox,
  FaMoneyBillWave,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaCartPlus,
} from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Loading from '../../Shared/Loading/Loading';


const ViewDetailsProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const res = await axios.get(`https://daily-mart-server.vercel.app/product/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`https://daily-mart-server.vercel.app/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Submit new review
  const onSubmitReview = async (data) => {
    console.log(data);

    const reviewPayload = {
      productId: id,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email,
      rating: data.rating,
      comment: data.comment,
      date: new Date().toISOString()
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewPayload);
      if (res.data.insertedId) {
        toast.success("Review submitted!");
        setReviews(prev => [...prev, reviewPayload]);
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review. Please give a rating.");
    }
  };

  const product = data?.product;
  const chartData = product?.prices?.map(p => ({
    date: new Date(p.date).toLocaleDateString('en-GB'),
    price: parseFloat(p.price),
  })) || [];

  const [selectedDate, setSelectedDate] = useState('');
  const [priceDifference, setPriceDifference] = useState(null);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  // Create a list of available previous dates (excluding latest date)
  const availableDates = product?.prices?.slice(0, -1).map(p => new Date(p.date).toLocaleDateString('en-GB')) || [];

  // Get latest price (using optional chaining)
  const latestPrice = parseFloat(product?.latestPrice);

  // Handle date selection
  useEffect(() => {
    if (selectedDate && product?.prices) { // Added optional chaining
      const selectedEntry = product.prices.find(p => {
        const formatted = new Date(p.date).toLocaleDateString('en-GB');
        return formatted === selectedDate;
      });

      if (selectedEntry) {
        const selectedPrice = parseFloat(selectedEntry.price);
        const diff = latestPrice - selectedPrice;
        setPriceDifference(diff);
      }
    } else {
      setPriceDifference(null);
    }
  }, [selectedDate, product?.prices, latestPrice]); // Added optional chaining in dependency array


  if (isLoading) return <Loading></Loading>
  if (error) return <p className="text-center mt-10 text-red-600 font-medium">Failed to load product details.</p>;
  if (!product) return <p className="text-center mt-10 text-gray-500">Product not found.</p>;

  console.log(product);

  const watchList = {
    productName: product.itemName,
    marketName: product.marketName,
    date: new Date().toISOString(),
    userEmail: user?.email,
    previousPrice: product.prices
  }

  const handlePay = (id) => {
    console.log("Proceed to payment");
    navigate(`/dashboard/payment/${id}`)
  }

  const handleAddWatchlist = async (watchList) => {
    try {
      const res = await axiosSecure.post('/watchlist', watchList);
      if (res.data.insertedId) {
        toast.success("Added to watchlist!");
        setIsWatchlisted(true);
      } else {
        toast.error("Failed to add to watchlist.");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while adding to watchlist.");
      return false;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white border-l-4 border-t-2 border-b-2 rounded-xl shadow-lg overflow-hidden">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline transition p-6"
        >
          <FaArrowLeft /> Back to Products
        </button>

        {/* Image + Product Info Side-by-Side */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center items-start">
            <img
              src={product.imageUrl}
              alt={product.itemName}
              className="w-full max-w-sm rounded-2xl h-72 object-cover shadow-md"
            />
          </div>

          {/* Info */}
          <div className="w-full md:w-1/2 space-y-3 text-gray-700 text-base">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.itemName}</h2>

            <p><FaStore className="inline-block mr-1 text-blue-600" /> <strong>Market:</strong> {product.marketName}</p>
            <p><FaUserTie className="inline-block mr-1 text-purple-600" /> <strong>Vendor:</strong> {product.vendorName}</p>
            <p><FaEnvelope className="inline-block mr-1 text-gray-600" /> <strong>Email:</strong> {product.vendorEmail}</p>
            <p><FaCalendarAlt className="inline-block mr-1 text-indigo-600" /> <strong>Date:</strong> {new Date(product.date).toLocaleDateString()}</p>
            <p><FaClipboardCheck className="inline-block mr-1 text-teal-600" /> <strong>Status:</strong> {product.status}</p>
            <p><FaBox className="inline-block mr-1 text-yellow-600" /> <strong>Price per Unit:</strong> {product.pricePerUnit || 'N/A'}</p>

            <p className="text-2xl font-bold text-green-600 mt-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-700" /> ৳ {product.latestPrice ?? 'N/A'}
              <span className="text-sm font-medium text-gray-500">Latest Price</span>
            </p>
          </div>
        </div>

        {/* Description + Market Description Section */}
        <div className="px-6 md:px-12 pb-8">
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <FaInfoCircle /> Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.itemDescription || 'No description available.'}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <FaMapMarkedAlt /> Market Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.marketDescription || 'No market description.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-6 flex-wrap">
            <button
              onClick={() => handleAddWatchlist(watchList)}
              disabled={isWatchlisted}
              className={`px-4 py-2 border ${isWatchlisted
                  ? 'border-red-600 bg-red-100 text-red-600'
                  : 'border-red-500 text-red-600 hover:bg-red-50'
                } rounded-md text-sm font-medium transition flex items-center gap-1`}
            >
              <FaHeart className={isWatchlisted ? 'text-red-600' : 'text-red-300'} />
              {isWatchlisted ? 'Added to Watchlist' : 'Add to Watchlist'}
            </button>
            <button
              onClick={() => handlePay(product._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition shadow inline-flex items-center gap-2">
              <FaCartPlus /> Buy Now
            </button>
          </div>

          {/* Review and Comment Section */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🗣️ Review & Comments</h3>

            {/* Review Form */}
            <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4 mb-10">
              <div className="flex items-center gap-1">
                <label className="font-medium text-gray-700">Your Rating:</label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${watch('rating') >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setValue('rating', star)}
                  />
                ))}
                {/* Hidden input to register the rating with react-hook-form */}
                <input
                  type="hidden"
                  {...register('rating', { required: true, min: 1, max: 5 })}
                  value={watch('rating') || ''}
                />
              </div>
              <textarea
                {...register('comment', { required: true })}
                rows="3"
                placeholder="Write your comment about Price, Also do not forget to give a rating"
                className="w-full border rounded p-3"
              ></textarea>
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
              >
                Submit Review
              </button>
            </form>

            {/* Review List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to comment!</p>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold text-gray-700">{review.userName} ({review.userEmail})</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400" />)}
                      {[...Array(5 - review.rating)].map((_, i) => <FaStar key={i} className="text-gray-300" />)}
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 📊 Comparison with Previous Data */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Price Comparison Over Time</h3>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mr-2">Select a previous date:</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-2 py-1 rounded-md text-sm"
              >
                <option value="">-- Choose a date --</option>
                {availableDates.map((date, index) => (
                  <option key={index} value={date}>{date}</option>
                ))}
              </select>
            </div>

            {selectedDate && (
              <p className="text-sm font-medium text-gray-700 mb-4">
                {priceDifference > 0
                  ? `🔺 Price increased by ৳${priceDifference.toFixed(2)} since ${selectedDate}`
                  : priceDifference < 0
                    ? `🔻 Price decreased by ৳${Math.abs(priceDifference).toFixed(2)} since ${selectedDate}`
                    : `⚖️ No change in price since ${selectedDate}`}
              </p>
            )}

            {chartData.length < 2 ? (
              <p className="text-gray-500">Not enough price data for comparison.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="price" domain={['auto', 'auto']} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsProduct;