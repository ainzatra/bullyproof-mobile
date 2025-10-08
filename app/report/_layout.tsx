import AuthGuard from '@/components/AuthGuard';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

const _layout = () => {
  return (
    <AuthGuard>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthGuard>
  );
};

export default _layout;

const styles = StyleSheet.create({});
