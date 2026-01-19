import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login, register, getProfile, updateProfile } from '../services/authService'

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,

            // Actions
            login: async (email, password) => {
                set({ loading: true, error: null })
                try {
                    const data = await login(email, password)
                    set({
                        user: data,
                        token: data.token,
                        isAuthenticated: true,
                        loading: false
                    })
                    return data
                } catch (error) {
                    set({ error: error.message, loading: false })
                    throw error
                }
            },

            register: async (name, email, password) => {
                set({ loading: true, error: null })
                try {
                    const data = await register(name, email, password)
                    set({
                        user: data,
                        token: data.token,
                        isAuthenticated: true,
                        loading: false
                    })
                    return data
                } catch (error) {
                    set({ error: error.message, loading: false })
                    throw error
                }
            },

            logout: () => {
                set({ user: null, token: null, isAuthenticated: false })
            },

            updateUser: async (userData) => {
                set({ loading: true, error: null })
                try {
                    const data = await updateProfile(userData)
                    set({ user: data, loading: false })
                    return data
                } catch (error) {
                    set({ error: error.message, loading: false })
                    throw error
                }
            },

            clearError: () => set({ error: null })
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
)

export default useAuthStore
