import axios from 'axios';

// Keeping the keys for when you're ready to switch back
const ADZUNA_APP_ID = "e0710e5b";
const ADZUNA_APP_KEY = "c6fadcd4c78d8abc31d3a2b526232ef9";
const BASE_URL = 'https://api.adzuna.com/v1/api/jobs/us/search/1';

export const fetchJobs = async (query = '', location = '', fullTime = false) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        app_id: ADZUNA_APP_ID,
        app_key: ADZUNA_APP_KEY,
        what: query,
        where: location,
        full_time: fullTime ? 1 : undefined,
      }
    });
    
    // Adzuna returns results in response.data.results
    return response.data.results;
  } catch (error) {
    console.error('Error fetching jobs from Adzuna:', error);
    throw error;
  }
};
