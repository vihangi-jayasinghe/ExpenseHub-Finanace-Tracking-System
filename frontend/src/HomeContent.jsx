import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Shield, Sparkles, TrendingUp, Wallet } from 'lucide-react'

export default function HomeContent() {
  return (
    <div className="min-height-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <TrendingUp size={22} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            ExpenseHub
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
          <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
            Login
          </Link>
          <Link to="/register" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Subtle decorative background gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-400/10 blur-[80px] rounded-full pointer-events-none -z-10" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-6">
            <Sparkles size={12} className="fill-blue-500" />
            <span>Smart Personal Finance Manager</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-tight">
            Track your expenses.{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Grow your savings.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">
            Beautiful, simple, and automated finance tracking. Categorize your spending, monitor your income streams, and analyze your net worth with ease.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 group transition-all"
            >
              <span>Create Free Account</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all"
            >
              Sign In
            </Link>
          </div>

          {/* Interactive UI Mockup */}
          <div className="mt-16 w-full max-w-5xl rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="w-3 w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400 ml-2 font-medium">demo-dashboard.expensehub.com</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Balance</span>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">$4,850.00</h3>
                <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">↑ 12.3% from last month</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Income</span>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">$7,200.00</h3>
                <span className="text-xs text-slate-400 font-medium mt-1 inline-block">Active this month</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expenses</span>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">$2,350.00</h3>
                <span className="text-xs text-rose-500 font-medium mt-1 inline-block">32.6% of allocation</span>
              </div>
            </div>

            <div className="h-48 bg-gradient-to-t from-slate-50/50 to-transparent rounded-xl border border-dashed border-slate-200 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <BarChart3 size={32} />
                <span className="text-sm font-semibold">Real-time analytical graphs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-100/50 border-y border-slate-200/50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Everything you need to master your money
              </h2>
              <p className="mt-4 text-slate-600">
                No spreadsheets, no manual math. ExpenseHub automates tracking and gives you crystal-clear clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Wallet size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Track Expenses</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  Record and categorize expenses dynamically. Monitor where every single dollar goes and identify leakages.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Income Management</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  Track salary, investments, freelance projects, and all sources of income in one consolidated ledger.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Secure Profile Vault</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  Your financial data is protected under robust security mechanisms. Access profile settings securely.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <TrendingUp size={16} />
            </div>
            <span className="font-bold text-slate-800">ExpenseHub</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 ExpenseHub. Built with precision for smart financial growth.
          </p>
          <div className="flex gap-4 text-xs font-semibold text-slate-500">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
