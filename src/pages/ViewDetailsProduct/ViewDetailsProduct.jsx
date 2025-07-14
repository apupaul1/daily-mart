import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const ViewDetailsProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/product/${id}`);
      return res.data;
    },
  });





  if (isLoading) return <p className="text-center mt-10 text-lg text-gray-600">Loading product details...</p>;
  if (error) return <p className="text-center mt-10 text-red-600 font-medium">Failed to load product details.</p>;

  const product = data?.product;
  if (!product) return <p className="text-center mt-10 text-gray-500">Product not found.</p>;

  console.log(product);
  const watchList = {
    productName: product.itemName,
    marketName: product.marketName,
    date: new Date().toISOString(),
    userEmail: user?.email, 
  }


  const handleAddWatchlist = async (watchList) => {
    try {
      const res = await axiosSecure.post('/watchlist', watchList);
      if (res.data.insertedId) {
        toast.success("✅ Added to watchlist!");
      } else {
        toast.error("❌ Failed to add to watchlist.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ An error occurred while adding to watchlist.");
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
              className="px-4 py-2 border border-red-500 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition flex items-center gap-1">
              <FaHeart /> Add to Watchlist
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition shadow inline-flex items-center gap-2">
              <FaCartPlus /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsProduct;
