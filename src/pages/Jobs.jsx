import { useState, useEffect } from 'react';
import { Search, MapPin, Building2, Clock, Heart, Loader2 } from 'lucide-react';
import { fetchJobs } from '../services/adzuna';
import { saveJobToFirestore, removeJobFromFirestore, getSavedJobsFromFirestore } from '../services/db';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Jobs() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search state
  const [query, setQuery] = useState('developer');
  const [location, setLocation] = useState('');
  const [fullTime, setFullTime] = useState(false);
  
  const [savedJobIds, setSavedJobIds] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadSavedJobs();
    } else {
      setSavedJobIds([]);
    }
  }, [currentUser]);

  const loadSavedJobs = async () => {
    try {
      const saved = await getSavedJobsFromFirestore(currentUser.uid);
      setSavedJobIds(saved.map(job => String(job.id)));
    } catch (err) {
      console.error('Failed to load saved jobs', err);
    }
  };

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchJobs(query, location, fullTime);
      setJobs(results || []);
    } catch (err) {
      setError('Failed to fetch jobs. Please check your API keys.');
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadJobs();
  };

  const toggleSave = async (job) => {
    if (!currentUser) {
      toast.error('Please sign in to save jobs!');
      return;
    }

    const jobIdStr = String(job.id);
    const isSaved = savedJobIds.includes(jobIdStr);

    try {
      if (isSaved) {
        await removeJobFromFirestore(currentUser.uid, job.id);
        setSavedJobIds(savedJobIds.filter(id => id !== jobIdStr));
        toast.success('Job removed from saved');
      } else {
        await saveJobToFirestore(currentUser.uid, job);
        setSavedJobIds([...savedJobIds, jobIdStr]);
        toast.success('Job saved successfully!');
      }
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update saved jobs: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Search Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job title or keyword" 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or zip" 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button type="submit" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Filters</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={fullTime}
                  onChange={(e) => {
                    setFullTime(e.target.checked);
                  }}
                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700 font-medium">Full-time only</span>
              </label>
              <button 
                onClick={loadJobs}
                className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
            <span className="text-gray-500">{jobs.length} jobs found</span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Fetching the latest jobs...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-100">
              <p className="font-semibold">{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-gray-50 text-gray-600 p-12 rounded-xl text-center border border-gray-200">
              <h3 className="text-xl font-bold mb-2">No jobs found</h3>
              <p>Try adjusting your search terms or location.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {job.company.display_name}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location.display_name}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {job.contract_type === 'full_time' ? 'Full-time' : 'Contract'}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSave(job)}
                      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${savedJobIds.includes(String(job.id)) ? 'text-red-500' : 'text-gray-400'}`}
                    >
                      <Heart className="w-6 h-6" fill={savedJobIds.includes(String(job.id)) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  {/* Job snippet / description preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2" dangerouslySetInnerHTML={{__html: job.description}}></p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-medium text-gray-900">
                      {job.salary_min ? `$${Math.round(job.salary_min).toLocaleString()} - $${Math.round(job.salary_max).toLocaleString()}` : 'Salary not specified'}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {new Date(job.created).toLocaleDateString()}
                      </span>
                      <a 
                        href={job.redirect_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
