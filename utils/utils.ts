// Currently not used
import Constants from 'expo-constants';

export const request = async (
  url: string,
  token: string,
  options: RequestInit = {},
) => {
  const envUrl =
    (Constants as any)?.expoConfig?.extra?.BACKEND_URL ??
    (Constants as any)?.manifest?.extra?.BACKEND_URL;

  const fallback = 'http://192.168.0.132:3031';
  const base = envUrl || fallback;
  const baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;

  console.log('Making request to:', `${baseUrl}${url}`);

  const headers: Record<string, string> = {
    ...(options.body instanceof FormData
      ? {}
      : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers,
  });

  console.log('request status:', response.status);

  return response;
};
