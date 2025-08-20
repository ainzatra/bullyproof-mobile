import { useUser } from "@/stores/useUserStore";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import './globals.css';

export default function RootLayout() {
  const user = useUser()
  const router = useRouter()
  const [ready, setReady] = useState(false)

  // Run redirect after mount
  useEffect(() => {
    setReady(true) // layout is mounted
  }, [])

  useEffect(() => {
    if (ready && user) {
      router.replace('/home') // safe navigation
    }
  }, [ready, user])
  
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='onboarding'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='welcome'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='(auth)'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
