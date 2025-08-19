import { router } from 'expo-router'
import { create } from 'zustand'

type User = {
    id: string
    name: string
    email: string
}

type UserStore = {
    user: User | null

    setUser: (user: User) => void

    logout: () => void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user: User) => set({ user }),

  logout: () => {
    set({ user: null })
    router.replace('/login')
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useSetUser = () => useUserStore((state) => state.setUser)
export const useLogoutUser = () => useUserStore((state) => state.logout)
