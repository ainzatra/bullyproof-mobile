import Constants from 'expo-constants';

export const request = async (url: string, options: RequestInit = {}) => {
  // Resolve backend URL from multiple sources:
  // 1. process.env (if injected at build time)
  // 2. expo config extras (app.json/app.config.js -> extra)
  // 3. fallback to local IP used in .env for development
  const envUrl = process.env.BACKEND_URL;

  // Access expo constants using 'any' to avoid TypeScript manifest typing issues.
  // This safely checks both expoConfig.extra and manifest.extra for BACKEND_URL.
  const extraUrl =
    (Constants as any)?.expoConfig?.extra?.BACKEND_URL ??
    (Constants as any)?.manifest?.extra?.BACKEND_URL;

  const fallback = 'http://192.168.0.131:3031';
  const base = envUrl || extraUrl || fallback;
  const baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  return response;
};
