import { authClient } from '@/api/client';

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, signal }: any) => {
    try {
      // eslint-disable-next-line no-console
      console.log(url, method, data, params, signal);
      const result = await authClient({ url, method, data, params, signal });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
