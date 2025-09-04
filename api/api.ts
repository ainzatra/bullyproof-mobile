import { request } from '@/utils/utils';

async function callApi(url: string, token = '', options: RequestInit = {}) {
  const resp = await request(url, token, options);
  const data = await resp.json().catch(() => null);

  if (!resp.ok) {
    // throw the parsed response (if any) so callers / react-query can handle it
    throw data || { message: 'Network error' };
  }

  return data;
}

export const auth = {
  login: (payload: { email: string; password: string }) =>
    callApi('/auth/login', '', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  signup: (payload: any) =>
    callApi('/auth/signup', '', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  verifyOtp: (payload: { email: string; code: string }) =>
    callApi('/auth/verify-otp', '', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  resendOtp: (payload: { email: string }) =>
    callApi('/auth/resend-otp', '', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

export const reports = {
  createReport: (formData: FormData, token = '') =>
    callApi('/reports', token, {
      method: 'POST',
      body: formData,
    }),

  fetchReports: (token: string, id: string) =>
    callApi(`/reports/${id}`, token, { method: 'GET' }),
};

export default { auth, reports };
