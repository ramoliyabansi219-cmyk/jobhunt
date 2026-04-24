import { useState, useEffect } from 'react';
import { Building2, Clock, Heart, Loader2, MapPin } from 'lucide-react';
import { getSavedJobsFromFirestore, removeJobFromFirestore } from '../services/db';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function SavedJobs() {
  const { currentUser } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadSavedJobs();
    }
  }, [currentUser]);

  const loadSavedJobs = async () => {
    setLoading(true);
    try {
      const jobs = await getSavedJobsFromFirestore(currentUser.uid);
      setSavedJobs(jobs);
    } catch (error) {
      toast.error('Failed to load saved jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    try {
      await removeJobFromFirestore(currentUser.uid, jobId);
      setSavedJobs(savedJobs.filter(job => job.id !== jobId));
      toast.success('Job removed from saved list');
    } catch (error) {
      toast.error('Failed to remove job');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading your saved jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Saved Jobs</h1>
          <p className="text-gray-600">You have {savedJobs.length} saved {savedJobs.length === 1 ? 'position' : 'positions'}.</p>
        </div>

        {savedJobs.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No saved jobs yet</h2>
            <p className="text-gray-600 mb-8">Jobs you favorite will appear here so you can easily find them later.</p>
            <Link 
              to="/jobs" 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedJobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" /> 
                        {job.company?.display_name || 'Unknown Company'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> 
                        {job.location?.display_name || 'Unknown Location'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> 
                        {job.contract_type === 'full_time' ? 'Full-time' : 'Contract'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemove(job.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-red-500"
                    title="Remove from saved"
                  >
                    <Heart className="w-6 h-6" fill="currentColor" />
                  </button>
                </div>
                
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
  );
}
