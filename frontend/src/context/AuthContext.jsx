import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.getProfile()
        .then(profile => {
          if (profile) {
            setUser(profile)
          } else {
            localStorage.removeItem('token')
          }
        })
        .catch(err => {
          console.error('Initial profile fetch failed:', err)
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    setLoading(true)
    return api.getProfile()
      .then(profile => {
        setUser(profile)
        return profile
      })
      .finally(() => setLoading(false))
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const refreshProfile = () => {
    if (!localStorage.getItem('token')) return Promise.resolve(null)
    return api.getProfile()
      .then(profile => {
        setUser(profile)
        return profile
      })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
