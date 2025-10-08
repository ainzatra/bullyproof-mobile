import { useUser } from '@/stores/useUserStore';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Authentication guard component that protects authenticated routes.
 * If no user is found, redirects to the index page.
 * Shows a loading indicator while checking authentication status.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const user = useUser();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    // Small delay to ensure the user state is loaded from storage
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isChecking) {
      if (!user) {
        router.replace('/');
      }
    }
  }, [user, isChecking]);

  // Show loading indicator while checking authentication
  if (isChecking) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  // If no user, don't render anything (will redirect)
  if (!user) {
    return (
      <View className="flex-1 bg-white">
        {/* Empty view - will redirect to index */}
      </View>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
}
