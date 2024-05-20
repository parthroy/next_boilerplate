import axios, { AxiosRequestConfig } from 'axios';
import client from './client'; // Assuming client is an instance of axios

interface Store {
  getState: () => {
    auth: {
      token: string | null;
    };
  };
}

export default function addAuthTokenInterceptor(store: Store) {
  client.interceptors.request.use((req: AxiosRequestConfig) => {
    const bearerToken = store.getState().auth.token;
    if (!bearerToken) return req;
    if (!req.headers) {
      req.headers = {};
    }
    req.headers['Authorization'] = `Bearer ${bearerToken}`;
    return req;
  });
}
