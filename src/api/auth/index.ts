import client from '../client';

export const login = (params) => {
  const user = {
    ...params,
    'auth-type': 'user',
  };

  return client.post(`/api/users/login`, user);
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
