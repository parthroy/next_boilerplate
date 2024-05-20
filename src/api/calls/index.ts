import client from '../client';

// Utility function to encode query parameters
const encodeParams = (params: Record<string, any>): string => {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
};

export const fetchCalls = (params) => {
  const query = encodeParams(params);
  return client.get(`/api/userreplies?${query}`);
};
