import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Wallet, CreditCard, Scale, Loader2, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react'
import Card from '../components/Card'
import { api } from '../services/api'

export default function Dashboard() {
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setError('')
    api.getSummary()
      .then(res => {
        if (res && typeof res === 'object') {
          const totalIncome = parseFloat(res.totalIncome || 0)
          const totalExpenses = parseFloat(res.totalExpenses || 0)
          const balance = parseFloat(res.balance || 0)
          setSummary({ totalIncome, totalExpenses, balance })
        }
      })
      .catch(err => {
        console.error('Failed to load dashboard summary', err)
        setError('Could not retrieve financial data.')
        if (err.message && err.message.toLowerCase().includes('unauthorized')) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-slate-500">
        <Loader2 size={36} className="animate-spin text-blue-600" />
        <span className="text-sm font-semibold">Retrieving secure financial records...</span>
      </div>
    )
  }

  // Calculate percentage of budget spent
  const percentageSpent = summary.totalIncome > 0
    ? Math.min((summary.totalExpenses / summary.totalIncome) * 100, 100)
    : 0

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Financial Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time ledger summary synchronized with the database.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/expenses/new" className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm">
            + Add Expense
          </Link>
          <Link to="/incomes/new" className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm">
            + Add Income
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Grid of metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Income</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Wallet size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-4">
              ${summary.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="mt-6 flex items-center gap-1 text-xs text-emerald-600 font-bold bg-emerald-50 w-fit px-2 py-1 rounded-lg">
            <ArrowUpRight size={14} />
            <span>Active Streams</span>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-2xl rounded-full" />
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Expenses</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <CreditCard size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-4">
              ${summary.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="mt-6 flex items-center gap-1 text-xs text-rose-600 font-bold bg-rose-50 w-fit px-2 py-1 rounded-lg">
            <ArrowDownRight size={14} />
            <span>Spending Allocation</span>
          </div>
        </div>

        {/* Balance Card */}
        <div className={`border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between ${
          summary.balance >= 0 ? 'bg-gradient-to-tr from-blue-50/50 via-white to-indigo-50/20 border-blue-100' : 'bg-rose-50/20 border-rose-100'
        }`}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full" />
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Balance</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                summary.balance >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
              }`}>
                <Scale size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-4">
              ${summary.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className={`mt-6 text-xs font-bold w-fit px-2 py-1 rounded-lg ${
            summary.balance >= 0 ? 'text-blue-600 bg-blue-50' : 'text-rose-600 bg-rose-50'
          }`}>
            {summary.balance >= 0 ? 'Surplus Balance' : 'Deficit Balance'}
          </div>
        </div>
      </div>

      {/* Financial Health / Budget tracker block */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Sparkles size={16} className="text-blue-500" />
          <span>Spending vs Income Ratio</span>
        </h4>

        {summary.totalIncome === 0 && summary.totalExpenses === 0 ? (
          <p className="text-slate-400 text-sm">Create income and expense items to view health analysis.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold text-slate-700">
              <span>Expenses ratio to total Income</span>
              <span>{percentageSpent.toFixed(1)}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  percentageSpent > 80 ? 'bg-rose-500' : percentageSpent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${percentageSpent}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {percentageSpent > 80
                ? 'Alert: You are spending more than 80% of your income. Consider scaling back expenses.'
                : percentageSpent > 50
                ? 'Warning: You are spending over half of your income. Keep tabs on non-essentials.'
                : 'Excellent: Your expenses are well-managed relative to your income!'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
