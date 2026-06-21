import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'
import logoUrl from '../assets/Logo.jpg'

export default function About() {
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
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">About ExpenseHub</h1>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600">
          <p className="text-lg leading-relaxed">ExpenseHub is a premium personal finance tracking system designed to give you clarity and control over your capital.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Our Mission</h2>
          <p>We believe that managing personal and business finances shouldn't require complex spreadsheets or expensive accountants. Our mission is to provide an intuitive, secure, and fast platform where anyone can track their incomes, manage their expenses, and visualize their financial health.</p>
          
          <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">The Technology</h2>
          <p>ExpenseHub is built with modern web technologies including React, Vite, Tailwind CSS, and a robust Java Spring Boot backend, ensuring blazingly fast performance and reliable data consistency.</p>
        </div>
      </main>
    </div>
  )
}
