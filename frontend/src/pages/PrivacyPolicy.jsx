import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import logoUrl from '../assets/Logo.jpg'

export default function PrivacyPolicy() {
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
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Shield size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-lg">Last updated: June 2026</p>
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. How We Use Information</h2>
          <p>We may use the information we collect about you to Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Data Storage</h2>
          <p>We use industry standard security measures to protect your information so that it is not made available to unauthorized parties. We use JSON Web Tokens (JWT) for authentication and store passwords using strong cryptographic hashing algorithms.</p>
        </div>
      </main>
    </div>
  )
}
