import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

import {
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaMoneyBillWave,
  FaStore,
  FaUserTie,
  FaEnvelope,
  FaCalendarAlt,
  FaClipboardCheck,
  FaSearchPlus,
} from 'react-icons/fa';
import { HiOutlineFilter, HiOutlineRefresh } from 'react-icons/hi';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Loading from '../../Shared/Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllProducts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const [sortOrder, setSortOrder] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [appliedSort, setAppliedSort] = useState('');
  const [appliedStart, setAppliedStart] = useState(null);
  const [appliedEnd, setAppliedEnd] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: products = {}, isLoading } = useQuery({
    queryKey: ['allProducts', appliedSort, appliedStart, appliedEnd, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/products', {
        params: {
          sort: appliedSort || undefined,
          start: appliedStart ? appliedStart.toISOString() : undefined,
          end: appliedEnd ? appliedEnd.toISOString() : undefined,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  console.log(products);

  const handleDetails = (id) => {
    if (!user?.email) {
      navigate('/login');
    } else {
      navigate(`/details/${id}`);
    }
  };

  const applyFilters = () => {
    setPage(1);
    setAppliedSort(sortOrder);
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
  };

  const resetFilters = () => {
    setSortOrder('');
    setStartDate(null);
    setEndDate(null);
    setPage(1);
    setAppliedSort('');
    setAppliedStart(null);
    setAppliedEnd(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800">All Market Products</h1>

      {/* Filter Bar */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 flex flex-wrap justify-around items-center gap-4">
        <div className="flex gap-2 flex-wrap">
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Start Date"
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            placeholderText="End Date"
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">Sort by Price</option>
            <option value="asc"><FaSortAmountUpAlt className="inline-block mr-1" /> Low to High</option>
            <option value="desc"><FaSortAmountDownAlt className="inline-block mr-1" /> High to Low</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm shadow flex items-center gap-1"
          >
            <HiOutlineFilter className="text-lg" /> Apply
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm shadow flex items-center gap-1"
          >
            <HiOutlineRefresh className="text-lg" /> Reset
          </button>
        </div>
      </div>

      {/* Product Cards */}
      {isLoading ? (
        <Loading></Loading>
      ) : products.data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.data.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={product.imageUrl}
                alt={product.itemName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-1 text-sm text-gray-700">
                <h3 className="text-lg font-bold text-gray-800">{product.itemName}</h3>
                <p><FaMoneyBillWave className="inline-block mr-1 text-green-600" /> <strong>Price:</strong> ৳{product.latestPrice}</p>
                <p><FaStore className="inline-block mr-1 text-blue-600" /> <strong>Market:</strong> {product.marketName}</p>
                <p><FaUserTie className="inline-block mr-1 text-purple-600" /> <strong>Vendor:</strong> {product.vendorName}</p>
                <p><FaCalendarAlt className="inline-block mr-1 text-indigo-600" /> <strong>Date:</strong> {product.date?.slice(0, 10)}</p>
                <button
                  onClick={() => handleDetails(product._id)}
                  className="mt-3 btn w-full btn-primary text-white py-2 rounded text-center font-medium transition flex items-center justify-center gap-2"
                >
                  <FaSearchPlus /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No products found.</p>
      )}

      {/* Pagination */}
      {products.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
          >
            <BiLeftArrowAlt /> Prev
          </button>

          {Array.from({ length: products.pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-gray-300'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, products.pages))}
            disabled={page === products.pages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
          >
            Next <BiRightArrowAlt />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
