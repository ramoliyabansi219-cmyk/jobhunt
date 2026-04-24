import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-purple-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl text-purple-100 mb-10">
            Search thousands of job listings from top companies and kickstart your career.
          </p>
          
          {/* Search Box */}
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="City, state, or zip code" 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <Link to="/jobs" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" /> Search Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories - Dummy Content */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Technology", count: "1,234 Jobs" },
            { title: "Design", count: "842 Jobs" },
            { title: "Marketing", count: "953 Jobs" },
            { title: "Finance", count: "645 Jobs" }
          ].map((category, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
