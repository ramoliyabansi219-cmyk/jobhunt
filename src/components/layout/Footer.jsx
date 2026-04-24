import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-white">JobHunt</span>
            </Link>
            <p className="text-sm text-gray-400">
              Connecting talented professionals with the world's most innovative companies. Your dream career starts here.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links: Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="hover:text-purple-400 transition-colors">Browse Jobs</Link></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Resume Builder</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Salary Guide</a></li>
            </ul>
          </div>

          {/* Links: Employers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Post a Job</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Search Resumes</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Recruiting Solutions</a></li>
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} JobHunt. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">English (US)</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
