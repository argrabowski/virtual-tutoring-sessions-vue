import baseAxios from 'axios';

const coreAxios = baseAxios.create({
  baseURL: process.env.VUE_APP_ASSISTMENTS_API || 'http://localhost:8081/api',
  // timeout: 5000, // 5 second timeout. Figure out a good/better one
  headers: {
    'Content-Type': 'application/json',
    // anything you want to add to the headers
  },
  withCredentials: true,
});

const loginPortalAxios = baseAxios.create({
  baseURL:
    process.env.VUE_APP_LOGIN_PORTAL_API ||
    'http://localhost:8081/loginPortal/api',
  // timeout: 5000, // 5 second timeout. Figure out a good/better one
  headers: {
    'Content-Type': 'application/json',
    // anything you want to add to the headers
  },
  withCredentials: true,
});

const vtsAxios = baseAxios.create({
  baseURL:
    process.env.VUE_APP_VTS_API ||
    'http://localhost:8081/VirtualTutoringSessions',
  // timeout: 5000, // 5 second timeout. Figure out a good/better one
  headers: {
    'Content-Type': 'application/json',
    // anything you want to add to the headers
  },
  withCredentials: true,
});

export { coreAxios, loginPortalAxios, vtsAxios };
