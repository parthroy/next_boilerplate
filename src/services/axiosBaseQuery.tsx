import axiosClient from '@/api/client';

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params, signal }: any) => {
    try {
      const result = await axiosClient({ url, method, data, params, signal });
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
