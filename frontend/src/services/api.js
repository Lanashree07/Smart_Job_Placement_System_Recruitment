import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
});

// Mock Storage Helper
const getStorage = (key, defaultVal) => {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : defaultVal;
};
const setStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

// Seed initial jobs if none exist
if (!localStorage.getItem('mock_jobs')) {
  setStorage('mock_jobs', [
    { id: 1, company: 'TechCorp', title: 'Software Engineer', location: 'New York', type: 'Full-time', salary: '$120,000', description: 'Great job', requirements: 'React, Node.js', deadline: '2026-10-01' },
    { id: 2, company: 'InnovateX', title: 'Frontend Developer', location: 'Remote', type: 'Contract', salary: '$90,000', description: 'Remote work', requirements: 'Vue, CSS', deadline: '2026-09-15' },
    { id: 3, company: 'DataSystems', title: 'Data Analyst', location: 'San Francisco', type: 'Full-time', salary: '$105,000', description: 'Analyze data', requirements: 'SQL, Python', deadline: '2026-11-20' },
  ]);
}
if (!localStorage.getItem('mock_users')) {
  setStorage('mock_users', [
    { id: 0, name: 'Admin User', email: 'admin@smarthire.com', password: 'admin123', role: 'ADMIN' }
  ]);
} else {
  // Ensure admin user exists
  const users = getStorage('mock_users', []);
  if (!users.find(u => u.role === 'ADMIN')) {
    users.push({ id: 0, name: 'Admin User', email: 'admin@smarthire.com', password: 'admin123', role: 'ADMIN' });
    setStorage('mock_users', users);
  }
}
if (!localStorage.getItem('mock_applications')) {
  setStorage('mock_applications', []);
}

export const authAPI = {
  login: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStorage('mock_users', []);
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          resolve({ data: { token: 'mock-token-' + user.id, user } });
        } else {
          reject({ response: { data: { message: 'Invalid credentials' } } });
        }
      }, 500);
    });
  },
  adminLogin: async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStorage('mock_users', []);
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password && u.role === 'ADMIN');
        if (user) {
          resolve({ data: { token: 'mock-token-' + user.id, user } });
        } else {
          reject({ response: { data: { message: 'Invalid admin credentials' } } });
        }
      }, 500);
    });
  },
  register: async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getStorage('mock_users', []);
        if (users.find(u => u.email === userData.email)) {
          reject({ response: { data: { message: 'Email already exists' } } });
          return;
        }
        const newUser = { ...userData, id: Date.now(), role: 'CANDIDATE' };
        users.push(newUser);
        setStorage('mock_users', users);
        resolve({ data: { message: 'Registration successful', user: newUser } });
      }, 500);
    });
  },
  updateProfile: async (userId, updateData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getStorage('mock_users', []);
        const index = users.findIndex(u => u.id === userId);
        if (index > -1) {
          users[index] = { ...users[index], ...updateData };
          setStorage('mock_users', users);
          resolve({ data: { user: users[index] } });
        }
      }, 500);
    });
  },
  getAllCandidates: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const users = getStorage('mock_users', []);
        resolve({ data: users.filter(u => u.role === 'CANDIDATE') });
      }, 300);
    });
  }
};

export const jobsAPI = {
  getAllJobs: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve({ data: getStorage('mock_jobs', []) }), 300);
    });
  },
  getJobById: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const jobs = getStorage('mock_jobs', []);
        const job = jobs.find(j => j.id === parseInt(id));
        resolve({ data: job });
      }, 300);
    });
  },
  createJob: async (jobData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const jobs = getStorage('mock_jobs', []);
        const newJob = { ...jobData, id: Date.now() };
        jobs.push(newJob);
        setStorage('mock_jobs', jobs);
        resolve({ data: newJob });
      }, 500);
    });
  },
  updateJob: async (id, jobData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const jobs = getStorage('mock_jobs', []);
        const index = jobs.findIndex(j => j.id === parseInt(id));
        if (index > -1) {
          jobs[index] = { ...jobs[index], ...jobData };
          setStorage('mock_jobs', jobs);
          resolve({ data: jobs[index] });
        }
      }, 500);
    });
  },
  deleteJob: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const jobs = getStorage('mock_jobs', []);
        const newJobs = jobs.filter(j => j.id !== parseInt(id));
        setStorage('mock_jobs', newJobs);
        resolve({ data: { message: 'Job deleted' } });
      }, 500);
    });
  }
};

export const applicationsAPI = {
  applyForJob: async (userId, jobId, jobDetails) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const apps = getStorage('mock_applications', []);
        const users = getStorage('mock_users', []);
        const user = users.find(u => u.id === userId) || {};
        
        if (apps.find(a => a.userId === userId && a.jobId === jobId)) {
          reject({ response: { data: { message: 'Already applied' } } });
          return;
        }
        const newApp = {
          id: Date.now(),
          userId,
          candidateName: user.name || 'Unknown',
          candidateEmail: user.email || 'Unknown',
          jobId,
          jobTitle: jobDetails.title,
          company: jobDetails.company,
          location: jobDetails.location,
          appliedDate: new Date().toISOString(),
          status: 'Applied',
          placementStatus: 'Pending'
        };
        apps.push(newApp);
        setStorage('mock_applications', apps);
        resolve({ data: newApp });
      }, 500);
    });
  },
  getCandidateApplications: async (userId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const apps = getStorage('mock_applications', []);
        resolve({ data: apps.filter(a => a.userId === userId) });
      }, 300);
    });
  },
  getCandidatePlacements: async (userId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const apps = getStorage('mock_applications', []);
        resolve({ data: apps.filter(a => a.userId === userId && a.status === 'Selected') });
      }, 300);
    });
  },
  getAllApplications: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: getStorage('mock_applications', []) });
      }, 300);
    });
  },
  updateApplicationStatus: async (id, status) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const apps = getStorage('mock_applications', []);
        const index = apps.findIndex(a => a.id === parseInt(id));
        if (index > -1) {
          apps[index] = { ...apps[index], status };
          if (status === 'Selected' && !apps[index].placementStatus) {
            apps[index].placementStatus = 'Selected'; // Initial placement status
          }
          setStorage('mock_applications', apps);
          resolve({ data: apps[index] });
        }
      }, 500);
    });
  },
  getAllPlacements: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const apps = getStorage('mock_applications', []);
        resolve({ data: apps.filter(a => a.status === 'Selected') });
      }, 300);
    });
  },
  updatePlacementStatus: async (id, placementStatus) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const apps = getStorage('mock_applications', []);
        const index = apps.findIndex(a => a.id === parseInt(id));
        if (index > -1) {
          apps[index] = { ...apps[index], placementStatus };
          setStorage('mock_applications', apps);
          resolve({ data: apps[index] });
        }
      }, 500);
    });
  }
};

export default api;
