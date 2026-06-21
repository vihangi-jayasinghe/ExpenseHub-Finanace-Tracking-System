import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { TrendingUp, User, LogOut, LayoutDashboard, Wallet, CreditCard } from 'lucide-react'
import { api } from '../services/api'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = localStorage.getItem('token')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (token) {
      api.getProfile()
        .then(user => {
          if (user && user.name) {
            setUserName(user.name)
          }
        })
        .catch(err => {
          console.error('Failed to load profile in header', err)
          if (err.message && err.message.toLowerCase().includes('unauthorized')) {
            localStorage.removeItem('token')
            navigate('/login')
          }
        })
    }
  }, [token, location.pathname])

  function logout() {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(token ? '/dashboard' : '/')}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/10">
          <TrendingUp size={20} className="stroke-[2.5]" />
        </div>
        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          ExpenseHub
        </span>
      </div>

      <div className="flex items-center gap-4">
        {token ? (
          <>
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-6.5 h-6.5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold uppercase">
                {userName ? userName.charAt(0) : <User size={12} />}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {userName || 'User'}
              </span>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
              title="Profile Settings"
            >
              <User size={18} />
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-xl transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
