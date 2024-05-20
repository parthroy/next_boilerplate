import axios from 'axios';

import isLocalStorageAvailable from '@/utils/Storage/isLocalStorageAvailable';
// client.js api
const baseURL = 'http://127.0.0.1:3000';
export { baseURL };
// console.warn("baseURL ==> ", baseURL);
const client = axios.create({

});

client.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('expries');
      localStorage.removeItem('persist:root');
      window.location.reload();
    }
  }

  // if (
  //   error.response?.status === 401 
  // ) {
  //   if (isLocalStorageAvailable()) {
  //     localStorage.removeItem("token");
  //     window.location.reload();
  //   }
  // }

  error.message = error.response
    ? error.response.data.message
    : error.request
      ? error.message
      : 'Something went wrong. Try again.';
  return Promise.reject(error);
});

// client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const access_token = await refreshAccessToken();
//       axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//       return client(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );
export default client;

export const authClient = axios.create({
  // baseURL: 'http://127.0.0.1:3000',
});
