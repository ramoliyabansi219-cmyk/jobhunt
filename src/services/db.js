import { doc, setDoc, deleteDoc, getDocs, collection, query } from 'firebase/firestore';
import { db } from './firebase';

// Helper to clean up object keys that Firestore rejects (like __CLASS__)
const sanitizeForFirestore = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeForFirestore);
  }
  
  const cleanedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    // Firestore rejects keys starting and ending with '__'
    if (key.startsWith('__') && key.endsWith('__')) {
      continue;
    }
    // Recursively sanitize undefined values or nested objects
    if (value !== undefined) {
      cleanedObj[key] = sanitizeForFirestore(value);
    }
  }
  return cleanedObj;
};

// Save a job to user's savedJobs collection
export const saveJobToFirestore = async (userId, job) => {
  try {
    const jobRef = doc(db, 'users', userId, 'savedJobs', String(job.id));
    const cleanJob = sanitizeForFirestore(job);
    await setDoc(jobRef, cleanJob);
    return true;
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

// Remove a job from user's savedJobs collection
export const removeJobFromFirestore = async (userId, jobId) => {
  try {
    const jobRef = doc(db, 'users', userId, 'savedJobs', String(jobId));
    await deleteDoc(jobRef);
    return true;
  } catch (error) {
    console.error('Error removing job:', error);
    throw error;
  }
};

// Get all saved jobs for a user
export const getSavedJobsFromFirestore = async (userId) => {
  try {
    const q = query(collection(db, 'users', userId, 'savedJobs'));
    const querySnapshot = await getDocs(q);
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });
    return jobs;
  } catch (error) {
    console.error('Error getting saved jobs:', error);
    throw error;
  }
};
