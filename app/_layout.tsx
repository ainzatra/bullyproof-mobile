import { useUser } from '@/stores/useUserStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import './globals.css';

export default function RootLayout() {
  const user = useUser();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const queryClient = new QueryClient();

  // Run redirect after mount
  useEffect(() => {
    setReady(true); // layout is mounted
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (user) {
      // Only treat explicit `false` as not verified. If `isVerified` is `true` or `undefined`,
      // proceed to onboarding. This avoids accidental redirects when `isVerified` is missing.
      if (user.isVerified === false) {
        router.replace('/login');
        return;
      }
      router.replace('/onboarding'); // safe navigation
      return;
    }

    // No user -> go to landing/index
    router.replace('/'); // safe navigation
  }, [ready, user]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="report"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
