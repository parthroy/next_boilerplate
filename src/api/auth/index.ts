import client from '../client';

export const login = (params) => {
  return client.post(`/api/auth/login`, params);
};

export const register = (params) => {
  const user = {
    ...params,
    'auth-type': 'user',
  };
  return client.post(`/api/users/register`, user);
};

export const breadSearch = (params) => {
  const user = {
    ...params,
    'auth-type': 'user',
  };
  return client.post(`/api/users/register`, user);
};
