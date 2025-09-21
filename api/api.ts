import { UpdatePassword, UpdateUserInfo } from '@/types/types';
import axios from './axios';

export const auth = {
  login: (payload: { email: string; password: string }) =>
    axios.post('/auth/login', payload).then((res) => res.data),

  signup: (payload: any) =>
    axios.post('/auth/signup', payload).then((res) => res.data),

  verifyOtp: (payload: { email: string; code: string }) =>
    axios.post('/auth/verify-otp', payload).then((res) => res.data),

  resendOtp: (payload: { email: string }) =>
    axios.post('/auth/resend-otp', payload).then((res) => res.data),

  sendResetOtp: (payload: { email: string }) =>
    axios.post('/auth/send-reset-otp', payload).then((res) => res.data),

  verifyResetOtp: (payload: { email: string; code: string }) =>
    axios.post('/auth/verify-reset-otp', payload).then((res) => res.data),

  resetPassword: (payload: {
    email: string;
    code: string;
    new: string;
    confirm: string;
  }) => axios.post('/auth/reset-password', payload).then((res) => res.data),
};

export const reports = {
  createReport: (formData: Record<string, any>, token = '') =>
    axios
      .post('/reports', formData, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      .then((res) => res.data),
  // .catch((err) => {
  //   if (err.response) {
  //     // Server responded with an error
  //     console.error('[API ERROR]', {
  //       status: err.response.status,
  //       data: err.response.data,
  //       headers: err.response.headers,
  //     });
  //   } else if (err.request) {
  //     console.log('display dito', { formData, token });
  //     // Request made but no response received
  //     console.error('[NETWORK ERROR]', err.message);
  //   } else {
  //     // Something happened while setting up the request
  //     console.error('[AXIOS ERROR]', err.message);
  //   }
  //   throw err; // rethrow if you want the caller to handle it
  // }),

  fetchReports: (token: string, id: string) =>
    axios
      .get(`/reports/user/${id}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      .then((res) => res.data),

  fetchReportById: (id: string, token: string) =>
    axios
      .get(`/reports/${id}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      .then((res) => res.data),
};

const chat = {
  getRecentMessages: async (id: string, token: string) =>
    axios
      .get(`/chat/${id}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
};

const me = {
  fetchUserInfo: async (id: string, token: string) =>
    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),

  updateInfo: async (id: string, token: string, payload: UpdateUserInfo) =>
    axios
      .put(`/users/update-info/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),

  updatePassword: async (id: string, token: string, payload: UpdatePassword) =>
    axios
      .put(`/users/update-password/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),

  updateAvatar: async (id: string, token: string, file: File) =>
    axios
      .putForm(
        `/users/update-avatar/${id}`,
        { file },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((res) => res.data),
};

export default { auth, reports, chat, me };
