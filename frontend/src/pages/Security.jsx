import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import logoUrl from '../assets/Logo.jpg'

export default function Security() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logoUrl} alt="ExpenseHub Logo" className="h-10 w-auto object-contain rounded-xl shadow-sm" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            ExpenseHub
          </span>
        </div>
        <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-blue-600">Back to Home</Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Security Details</h1>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-lg">Your data security is our top priority.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Encryption in Transit</h2>
          <p>All data transmitted between your browser and our servers is encrypted using industry-standard TLS (Transport Layer Security).</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Authentication & Authorization</h2>
          <p>We utilize stateless JSON Web Tokens (JWT) to securely authenticate user sessions. Each token is signed with a strong cryptographic key, ensuring that session data cannot be tampered with.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Infrastructure</h2>
          <p>Our database and application services are containerized using Docker, isolating environments and significantly reducing the attack surface. Passwords are never stored in plain text; they are salted and hashed using standard Spring Security algorithms.</p>
        </div>
      </main>
    </div>
  )
}
