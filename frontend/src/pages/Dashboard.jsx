import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Wallet, CreditCard, Scale, Loader2, ArrowUpRight, ArrowDownRight, Sparkles, Calendar, TrendingUp } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import Card from '../components/Card'
import { api } from '../services/api'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#64748B']

// Robust date parser to handle strings, Date objects, and Java-style integer arrays [yyyy, mm, dd]
function parseLocalDate(dateVal) {
  if (!dateVal) return null
  if (Array.isArray(dateVal)) {
    const year = dateVal[0]
    const month = dateVal[1] - 1
    const day = dateVal[2] || 1
    return new Date(year, month, day)
  }
  if (typeof dateVal === 'string') {
    const parts = dateVal.split('-')
    if (parts.length >= 2) {
      const year = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1
      const day = parts[2] ? parseInt(parts[2], 10) : 1
      return new Date(year, month, day)
    }
    return new Date(dateVal)
  }
  return new Date(dateVal)
}

function getYearMonthStr(dateVal) {
  const d = parseLocalDate(dateVal)
  if (!d || isNaN(d.getTime())) return ''
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}`
}

function getLocalDateString(dateVal) {
  const d = parseLocalDate(dateVal)
  if (!d || isNaN(d.getTime())) return ''
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpenses: 0, balance: 0 })
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])
  const [recentTransactions, setRecentTransactions] = useState([])
  const [monthlyData, setMonthlyData] = useState({ totalIncome: 0, totalExpenses: 0, highestExpenseCategory: 'N/A', highestExpenseAmount: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // State for selecting month, initialized to current month (format: YYYY-MM)
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    return `${d.getFullYear()}-${month}`
  })

  useEffect(() => {
    setLoading(true)
    setError('')

    Promise.all([
      api.getSummary(),
      api.getRecent(5),
      api.getMonthly(selectedMonth),
      api.getExpenses(),
      api.getIncomes()
    ])
      .then(([summaryRes, recentRes, monthlyRes, expensesRes, incomesRes]) => {
        if (summaryRes && typeof summaryRes === 'object') {
          setSummary({
            totalIncome: parseFloat(summaryRes.totalIncome || 0),
            totalExpenses: parseFloat(summaryRes.totalExpenses || 0),
            balance: parseFloat(summaryRes.balance || 0)
          })
        }

        // recentRes is an array of TransactionDto
        if (Array.isArray(recentRes)) {
          setRecentTransactions(recentRes.map(r => ({
            id: r.id,
            title: r.title,
            amount: parseFloat(r.amount || 0),
            date: getLocalDateString(r.date),
            type: r.type,
            category: r.category,
            description: r.description
          })))
        } else {
          setRecentTransactions([])
        }

        // monthly summary contains totals and highest category
        if (monthlyRes && typeof monthlyRes === 'object') {
          setMonthlyData({
            totalIncome: parseFloat(monthlyRes.totalIncome || 0),
            totalExpenses: parseFloat(monthlyRes.totalExpenses || 0),
            highestExpenseCategory: monthlyRes.highestExpenseCategory || 'N/A',
            highestExpenseAmount: parseFloat(monthlyRes.highestExpenseAmount || 0)
          })
        }

        setExpenses(expensesRes || [])
        setIncomes(incomesRes || [])
      })
      .catch(err => {
        console.error('Failed to load dashboard data', err)
        setError('Could not retrieve financial data.')
        if (err.message && err.message.toLowerCase().includes('unauthorized')) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate, selectedMonth])

  // --- Process charts datasets ---
  const cashFlowData = useMemo(() => {
    const data = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const key = `${year}-${month}`
      
      const monthLabel = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      
      const monthlyInc = incomes
        .filter(inc => getYearMonthStr(inc.incomeDate) === key)
        .reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0)
        
      const monthlyExp = expenses
        .filter(exp => getYearMonthStr(exp.expenseDate) === key)
        .reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0)
        
      data.push({
        name: monthLabel,
        Income: monthlyInc,
        Expenses: monthlyExp
      })
    }
    return data
  }, [expenses, incomes])

  const categoryData = useMemo(() => {
    const filtered = expenses.filter(exp => getYearMonthStr(exp.expenseDate) === selectedMonth)
    const groups = {}
    filtered.forEach(exp => {
      const cat = exp.category || 'Other'
      groups[cat] = (groups[cat] || 0) + parseFloat(exp.amount || 0)
    })
    
    return Object.entries(groups).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value)
  }, [expenses, selectedMonth])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-3 text-slate-500">
        <Loader2 size={36} className="animate-spin text-blue-600" />
        <span className="text-sm font-semibold">Retrieving secure financial records...</span>
      </div>
    )
  }

  // --- Monthly data comes from backend ---
  const totalMonthlyExpenses = monthlyData.totalExpenses || 0
  const totalMonthlyIncome = monthlyData.totalIncome || 0
  const highestCategory = monthlyData.highestExpenseCategory || 'N/A'
  const highestCategoryAmount = monthlyData.highestExpenseAmount || 0

  // Recent transactions are provided by the backend
  const latestTransactions = recentTransactions.slice(0, 5)

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Financial Overview</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time ledger summary synchronized with the database.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/expenses/new" className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm">
            + Add Expense
          </Link>
          <Link to="/incomes/new" className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm animate-pulse hover:animate-none">
            + Add Income
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Grid of overall metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
          <div>
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">All-Time Income</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Wallet size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-4">
              Rs.{summary.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">All-Time Expenses</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <CreditCard size={18} />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-4">
              Rs.{summary.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="mt-6 flex items-center gap-1 text-xs text-rose-600 font-bold bg-rose-50 w-fit px-2 py-1 rounded-lg">
            <ArrowDownRight size={14} />
            <span>Spending Allocation</span>
          </div>
        </div>

        {/* Balance Card */}
        <div className={`border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between ${
          summary.balance >= 0 ? 'bg-linear-to-tr from-blue-50/50 via-white to-indigo-50/20 border-blue-100' : 'bg-rose-50/20 border-rose-100'
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
              Rs.{summary.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className={`mt-6 text-xs font-bold w-fit px-2 py-1 rounded-lg ${
            summary.balance >= 0 ? 'text-blue-600 bg-blue-50' : 'text-rose-600 bg-rose-50'
          }`}>
            {summary.balance >= 0 ? 'Surplus Balance' : 'Deficit Balance'}
          </div>
        </div>
      </div>

      {/* Monthly Analysis block */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" />
            <span>Monthly Analysis</span>
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Select Month:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Income</span>
            <h4 className="text-xl font-bold mt-1 text-emerald-600">
              Rs.{totalMonthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h4>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Expenses</span>
            <h4 className="text-xl font-bold mt-1 text-rose-600">
              Rs.{totalMonthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h4>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Highest Expense Category</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h4 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
                {highestCategory}
              </h4>
              {highestCategoryAmount > 0 && (
                <span className="text-xs text-rose-500 font-bold">
                  (Rs.{highestCategoryAmount.toFixed(2)})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Cash Flow Chart */}
        <div className="lg:col-span-3 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-4">
              <TrendingUp size={16} className="text-blue-500" />
              <span>Cash Flow Trend (Last 6 Months)</span>
            </h4>
          </div>
          <div className="h-80 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }} />
                <Bar dataKey="Income" fill="#10B981" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-4">
              <Scale size={16} className="text-blue-500" />
              <span>Category Allocation ({selectedMonth})</span>
            </h4>
          </div>
          <div className="h-80 mt-6 relative flex flex-col justify-center items-center">
            {categoryData.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-10">No expense records found for this month.</p>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="70%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4 w-full px-2 max-h-24 overflow-y-auto">
                  {categoryData.slice(0, 6).map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-[10px] font-bold text-slate-600 truncate uppercase">{entry.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold ml-auto">Rs.{entry.value.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Latest 5 Transactions */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
          <Sparkles size={16} className="text-blue-500" />
          <span>Latest 5 Transactions</span>
        </h4>

        {latestTransactions.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-6">No recent transactions recorded in this account.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {latestTransactions.map((tx) => (
              <div key={tx.id} className="py-4 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                    tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {tx.type === 'income' ? 'IN' : 'OUT'}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">{tx.title}</h5>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                      {tx.type === 'income' ? 'Income' : tx.category} • {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-extrabold text-sm ${
                    tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {tx.type === 'income' ? '+' : '-'}Rs.{tx.amount.toFixed(2)}
                  </span>
                  <p className="text-xs text-slate-400 truncate max-w-xs">{tx.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
