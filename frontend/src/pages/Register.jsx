import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TrendingUp, ArrowRight, User, Mail, MapPin, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'
import logoUrl from '../assets/Logo.jpg'

export default function Register() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [touched, setTouched] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  useEffect(() => {
    setStrength(calcStrength(password))
    setValid(
      name.trim().length > 0 &&
      address.trim().length > 0 &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length >= 6 &&
      password === confirm
    )
  }, [name, address, email, password, confirm])

  function calcStrength(pw) {
    let score = 0
    if (pw.length >= 6) score += 1
    if (/[A-Z]/.test(pw)) score += 1
    if (/[0-9]/.test(pw)) score += 1
    if (/[^A-Za-z0-9]/.test(pw)) score += 1
    return score
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!valid || loading) return

    setLoading(true)
    setErrorMsg('')

    api.register({ name, email, address, password })
      .then(res => {
        // Registration successful
        navigate('/login')
      })
      .catch(err => {
        console.error('Registration failed', err)
        setErrorMsg(err.message || 'Registration failed. Please check your data.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function toggleShowPassword() { setShowPassword(s => !s) }
  function toggleShowConfirm() { setShowConfirm(s => !s) }

  const strengthLabels = ['Very weak', 'Weak', 'Okay', 'Good', 'Strong']
  const strengthColors = [
    'bg-rose-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-emerald-500',
    'bg-emerald-600'
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Decorative Blurs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/60 shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left pane: Branding & Marketing info */}
        <div className="flex-1 bg-linear-to-tr from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 flex flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logoUrl} alt="ExpenseHub Logo" className="h-9 w-auto object-contain rounded-xl shadow-sm" />
            <span className="font-bold text-lg tracking-tight">ExpenseHub</span>
          </div>

          <div className="my-12 md:my-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Create an account & start <span className="bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">growing.</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-sm leading-relaxed">
              Track salaries, investments, daily expenses and more within a secure dashboard setup.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <span>Intuitive user profile management.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <span>Categorized and exportable transactions.</span>
              </li>
            </ul>
          </div>

          <div className="text-xs text-slate-400">
            © 2026 ExpenseHub. Built for modern businesses.
          </div>
        </div>

        {/* Right pane: Register form */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto">
            {/* Navigation links */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl gap-2 mb-8">
              <Link to="/login" className="flex-1 py-2 text-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all">
                Login
              </Link>
              <button className="flex-1 py-2 text-center text-sm font-semibold rounded-lg bg-white shadow-sm text-slate-800 transition-all">
                Register
              </button>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h3>
            <p className="text-slate-500 text-sm mt-1">Get started with a free personal account.</p>

            {errorMsg && (
              <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3 text-sm text-rose-800 animate-fadeIn">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Registration failure</span>
                  <p className="mt-0.5 text-rose-700/90">{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      touched.name && name.trim().length === 0
                        ? 'border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                    } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
                    placeholder="Jane Doe"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      touched.email && !/^\S+@\S+\.\S+$/.test(email)
                        ? 'border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                    } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
                    placeholder="jane@example.com"
                    disabled={loading}
                    required
                  />
                </div>
                {touched.email && !/^\S+@\S+\.\S+$/.test(email) && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle size={12} /> Please enter a valid email address.
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <MapPin size={18} />
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      touched.address && address.trim().length === 0
                        ? 'border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                    } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
                    placeholder="New York, USA"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    className={`w-full pl-10 pr-12 py-2.5 rounded-xl border ${
                      touched.password && password.length < 6
                        ? 'border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                    } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
                    placeholder="••••••••"
                    disabled={loading}
                    required
                  />
                  <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full ${strengthColors[strength]} transition-all`}
                          style={{ width: `${(strength / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                        {strengthLabels[strength]}
                      </span>
                    </div>
                  </div>
                )}
                {touched.password && password.length < 6 && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle size={12} /> Password must be at least 6 characters.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    aria-label="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                    className={`w-full pl-10 pr-12 py-2.5 rounded-xl border ${
                      touched.confirm && password !== confirm
                        ? 'border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                    } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
                    placeholder="••••••••"
                    disabled={loading}
                    required
                  />
                  <button type="button" onClick={toggleShowConfirm} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.confirm && password !== confirm && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle size={12} /> Passwords do not match.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!valid || loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Register</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
