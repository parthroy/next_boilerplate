import axios from 'axios';

import isLocalStorageAvailable from '@/utils/Storage/isLocalStorageAvailable';
// client.js api
const baseURL =
  process.env.REACT_APP_CHAT_GPT_SERVER || 'http://192.168.29.108:81';
export { baseURL };
// console.warn("baseURL ==> ", baseURL);
const client = axios.create({
  baseURL,
});

client.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 406) {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('expries');
      localStorage.removeItem('persist:root');
      window.location.reload();
    }
  }

  // if (
  //   error.response?.status === 404 &&
  //   error.response?.data?.message ===
  //     "You are logged out because you logged in with some other device. Please login again."
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
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://192.168.29.108:81',
});
