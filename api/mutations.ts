import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api';

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      api.auth.login(payload),
    // do not set global onSuccess here; screens will handle user state and navigation
  });

export const useSignup = () =>
  useMutation({
    mutationFn: (payload: any) => api.auth.signup(payload),
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: (payload: { email: string; code: string }) =>
      api.auth.verifyOtp(payload),
  });

export const useResendOtp = () =>
  useMutation({
    mutationFn: (payload: { email: string }) => api.auth.resendOtp(payload),
  });

export const useCreateReport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ form, token }: { form: FormData; token?: string }) =>
      api.reports.createReport(form, token ?? ''),
    onSuccess: () => {
      // invalidate reports list so it refetches
      qc.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};

export default {
  useLogin,
  useSignup,
  useVerifyOtp,
  useResendOtp,
  useCreateReport,
};
