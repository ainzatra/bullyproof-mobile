import axios from 'axios';
import Constants from 'expo-constants';

export const getBaseUrl = () => {
  const base =
    (Constants as any)?.expoConfig?.extra?.BACKEND_URL ??
    (Constants as any)?.manifest?.extra?.BACKEND_URL;
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
});

// request interceptor - logs requests
axiosInstance.interceptors.request.use(
  (config) => {
    const method = (config.method || 'GET').toString().toUpperCase();
    const url = config.url ?? '';
    const hasToken = Boolean(config.headers?.Authorization);
    let body: any = config.data;
    if (body instanceof FormData) {
      body = '[FormData]';
      // When sending FormData let axios/browser set the Content-Type with correct boundary.
      // Ensure we don't send a wrong Content-Type (e.g. application/x-www-form-urlencoded)
      // which breaks multipart uploads.
      if (config.headers) {
        // Some environments place headers under common or as plain object; delete both safe keys.
        if ('Content-Type' in config.headers) {
          delete (config.headers as any)['Content-Type'];
        }
        if (
          (config.headers as any).common &&
          'Content-Type' in (config.headers as any).common
        ) {
          delete (config.headers as any).common['Content-Type'];
        }
      }
    } else if (typeof body === 'string') {
      body = body.length > 200 ? body.slice(0, 200) + '... [truncated]' : body;
    }

    console.log(
      '[AXIOS] Request ->',
      JSON.stringify(
        {
          baseUrl: config.baseURL,
          url,
          method,
          hasToken,
          body,
          headers: config.headers,
        },
        null,
        2,
      ),
    );
    return config;
  },
  (error) => {
    console.log('[AXIOS] Request Error', error);
    return Promise.reject(error);
  },
);

// response interceptor - logs responses and errors (does NOT handle errors)
axiosInstance.interceptors.response.use(
  (response) => {
    const method = (response.config.method || 'GET').toString().toUpperCase();
    console.log(
      `[AXIOS] Response <- (${response.status}) ${method} ${response.config.url}`,
      JSON.stringify(response.data, null, 2),
    );
    return response;
  },
  (error) => {
    const resp = error?.response;
    if (resp) {
      console.log(
        '[AXIOS] Error response:',
        JSON.stringify(
          {
            status: resp.status,
            url: error.config?.url,
            method: (error.config?.method || '').toUpperCase(),
            data: resp.data,
          },
          null,
          2,
        ),
      );
      // reject with response data when available
      return Promise.reject(resp.data);
    } else {
      console.log('[AXIOS] Network Error:', JSON.stringify(error, null, 2));
      // reject with the original error for network failures
      return Promise.reject(error);
    }
  },
);

export const setAuthToken = (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
