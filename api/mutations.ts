import { UpdatePassword, UpdateUserInfo } from '@/types/types';
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

// Password reset flow (placeholders — replace backend paths/payloads as needed)
export const useSendResetOtp = () =>
  useMutation({
    mutationFn: (payload: { email: string }) => api.auth.sendResetOtp(payload),
  });

export const useVerifyResetOtp = () =>
  useMutation({
    mutationFn: (payload: { email: string; code: string }) =>
      api.auth.verifyResetOtp(payload),
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (payload: {
      email: string;
      code: string;
      new: string;
      confirm: string;
    }) => api.auth.resetPassword(payload),
  });

export const useCreateReport = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      form,
      token,
    }: {
      form: Record<string, any>;
      token: string;
    }) => api.reports.createReport(form, token),
    onSuccess: () => {
      // invalidate reports list so it refetches
      qc.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};

export const useUpdateUserInfo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      token,
      payload,
    }: {
      id: string;
      token: string;
      payload: UpdateUserInfo;
    }) => api.me.updateInfo(id, token, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-info'] });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({
      id,
      token,
      payload,
    }: {
      id: string;
      token: string;
      payload: UpdatePassword;
    }) => api.me.updatePassword(id, token, payload),
  });
};

export const useUpdateAvatar = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      token,
      file,
    }: {
      id: string;
      token: string;
      file: File;
    }) => api.me.updateAvatar(id, token, file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user-info'] });
    },
  });
};

export default {
  useLogin,
  useSignup,
  useVerifyOtp,
  useResendOtp,
  useSendResetOtp,
  useVerifyResetOtp,
  useResetPassword,
  useCreateReport,
};
