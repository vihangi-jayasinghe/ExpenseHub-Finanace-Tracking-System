import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import logoUrl from '../assets/Logo.jpg'

export default function TermsOfService() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logoUrl} alt="ExpenseHub Logo" className="h-10 w-auto object-contain rounded-xl shadow-sm" />
          <span className="font-bold text-xl tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            ExpenseHub
          </span>
        </div>
        <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Back to Home</Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Shield size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-lg">By accessing and using ExpenseHub, you agree to these Terms of Service.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Account Responsibilities</h2>
          <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Acceptable Use</h2>
          <p>You may not use the Service for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Termination</h2>
          <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </div>
      </main>
    </div>
  )
}
