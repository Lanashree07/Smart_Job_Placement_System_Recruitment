import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
});

// Centralized error handler for all requests
const handleError = (error) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    throw error;
  } else if (error.request) {
    console.error("Network Error: Server is unavailable. Is Spring Boot running?");
    throw new Error("Network Error: Server is unavailable. Please check if the backend is running.");
  } else {
    console.error("API Request Error:", error.message);
    throw error;
  }
};

api.interceptors.response.use((response) => response, handleError);

// Transformers to match Spring Boot nested JSON to React flat UI requirements
const formatStatus = (status) => {
  if (!status) return status;
  return status.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
};

const transformApplication = (app) => {
  if (!app) return app;
  return {
    ...app,
    candidateName: app.candidate?.fullName || 'Unknown',
    candidateEmail: app.candidate?.email || 'Unknown',
    jobTitle: app.job?.title || 'Unknown',
    company: app.job?.company || 'Unknown',
    status: formatStatus(app.status)
  };
};

const transformPlacement = (place) => {
  if (!place) return place;
  return {
    ...place,
    candidateName: place.candidate?.fullName || 'Unknown',
    candidateEmail: place.candidate?.email || 'Unknown',
    jobTitle: place.job?.title || place.role || 'Unknown',
    company: place.company || place.job?.company || 'Unknown',
    placementStatus: formatStatus(place.status)
  };
};

// Also Candidate has 'name' in React, but 'fullName' in Spring Boot
const transformUser = (user) => {
  if (!user) return user;
  return {
    ...user,
    name: user.fullName || user.name
  };
};

export const authAPI = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data && res.data.user && res.data.user.role === 'ADMIN') {
      throw new Error("Invalid credentials");
    }
    if (res.data && res.data.user) {
      res.data.user = transformUser(res.data.user);
    }
    return res;
  },
  adminLogin: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data && res.data.user && res.data.user.role !== 'ADMIN') {
      throw new Error("Invalid admin credentials");
    }
    if (res.data && res.data.user) {
      res.data.user = transformUser(res.data.user);
    }
    return res;
  },
  register: async (userData) => {
    // React form sends 'name', Spring Boot expects 'fullName'
    const payload = { ...userData, fullName: userData.name || userData.fullName };
    const res = await api.post('/auth/register', payload);
    if (res.data) res.data = transformUser(res.data);
    return res;
  },
  updateProfile: async (userId, updateData) => {
    const res = await api.put(`/candidates/${userId}`, updateData);
    if (res.data) res.data = transformUser(res.data);
    return res;
  },
  getAllCandidates: async () => {
    const res = await api.get('/candidates');
    // Ensure we only return CANDIDATE role
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.filter(u => u.role === 'CANDIDATE').map(transformUser);
    }
    return res;
  }
};

export const jobsAPI = {
  getAllJobs: async () => {
    return api.get('/jobs');
  },
  getJobById: async (id) => {
    return api.get(`/jobs/${id}`);
  },
  createJob: async (jobData) => {
    return api.post('/jobs', jobData);
  },
  updateJob: async (id, jobData) => {
    return api.put(`/jobs/${id}`, jobData);
  },
  deleteJob: async (id) => {
    return api.delete(`/jobs/${id}`);
  }
};

export const applicationsAPI = {
  applyForJob: async (userId, jobId, jobDetails) => {
    const res = await api.post('/applications', { candidateId: userId, jobId });
    if (res.data) res.data = transformApplication(res.data);
    return res;
  },
  getCandidateApplications: async (userId) => {
    const res = await api.get(`/applications/candidate/${userId}`);
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(transformApplication);
    }
    return res;
  },
  getCandidatePlacements: async (userId) => {
    const res = await api.get(`/placements/candidate/${userId}`);
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(transformPlacement);
    }
    return res;
  },
  getAllApplications: async () => {
    const res = await api.get('/applications');
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(transformApplication);
    }
    return res;
  },
  updateApplicationStatus: async (id, status) => {
    const enumStatus = status.toUpperCase().replace(' ', '_');
    const res = await api.put(`/applications/${id}/status`, { status: enumStatus });
    if (res.data) res.data = transformApplication(res.data);
    return res;
  },
  getAllPlacements: async () => {
    const res = await api.get('/placements');
    if (res.data && Array.isArray(res.data)) {
      res.data = res.data.map(transformPlacement);
    }
    return res;
  },
  updatePlacementStatus: async (id, placementStatus) => {
    const enumStatus = placementStatus.toUpperCase().replace(' ', '_');
    const res = await api.put(`/placements/${id}/status`, { status: enumStatus });
    if (res.data) res.data = transformPlacement(res.data);
    return res;
  }
};

export const adminAPI = {
  getDashboardStats: async () => {
    return api.get('/admin/dashboard');
  }
};

export default api;
