import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TrendingUp, ArrowRight, Mail, Lock, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react'
import { api } from '../services/api'
import logoUrl from '../assets/Logo.jpg'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    setValid(validateEmail(email) && password.length >= 6)
  }, [email, password])

  function validateEmail(val) {
    return /^\S+@\S+\.\S+$/.test(val)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!valid || loading) return

    setLoading(true)
    setErrorMsg('')

    api.login({ email, password })
      .then(res => {
        // Backend returns token in AuthResponse
        const token = res && res.token ? res.token : res
        if (token) {
          localStorage.setItem('token', token)
          navigate('/dashboard')
        } else {
          throw new Error('Authentication token not received.')
        }
      })
      .catch(err => {
        console.error('Login failed', err)
        setErrorMsg(err.message || 'Login failed. Please check your credentials.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-300/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/60 shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left pane: Branding & Marketing info */}
        <div className="flex-1 bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 flex flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent)] pointer-events-none" />
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logoUrl} alt="ExpenseHub Logo" className="h-9 w-auto object-contain rounded-xl shadow-sm" />
            <span className="font-bold text-lg tracking-tight">ExpenseHub</span>
          </div>

          <div className="my-12 md:my-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Master your capital with <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">precision.</span>
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-sm leading-relaxed">
              Access a high-stakes financial workspace engineered for clarity, speed, and trust.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <span>Secure storage with role-based JWT validation.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <span>Real-time income and expense computation.</span>
              </li>
            </ul>
          </div>

          <div className="text-xs text-slate-400">
            © 2026 ExpenseHub. Built for modern businesses.
          </div>
        </div>

        {/* Right pane: Login form */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto">
            {/* Navigation links */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl gap-2 mb-8">
              <button className="flex-1 py-2 text-center text-sm font-semibold rounded-lg bg-white shadow-sm text-slate-800 transition-all">
                Login
              </button>
              <Link to="/register" className="flex-1 py-2 text-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-all">
                Register
              </Link>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h3>
            <p className="text-slate-500 text-sm mt-1">Enter your credentials to manage your account.</p>

            {errorMsg && (
              <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3 text-sm text-rose-800 animate-fadeIn">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Authentication failure</span>
                  <p className="mt-0.5 text-rose-700/90">{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
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
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      touched.email && !validateEmail(email)
                        ? 'border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                    } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
                    placeholder="name@company.com"
                    disabled={loading}
                    required
                  />
                </div>
                {touched.email && !validateEmail(email) && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle size={12} /> Please enter a valid email address.
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Password
                  </label>
                  <a className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors" href="#forgot">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      touched.password && password.length < 6
                        ? 'border-rose-400 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                    } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
                    placeholder="••••••••"
                    disabled={loading}
                    required
                  />
                </div>
                {touched.password && password.length < 6 && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                    <AlertCircle size={12} /> Password must be at least 6 characters.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                  Remember this device
                </label>
              </div>

              <button
                type="submit"
                disabled={!valid || loading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
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
