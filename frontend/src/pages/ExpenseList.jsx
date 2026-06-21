import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreditCard, Trash2, Edit, Plus, Loader2 } from 'lucide-react'
import Table from '../components/Table'
import { api } from '../services/api'

export default function ExpenseList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadExpenses()
  }, [])

  function loadExpenses() {
    setLoading(true)
    setErrorMsg('')
    api.getExpenses()
      .then(res => {
        setItems(res || [])
      })
      .catch(err => {
        console.error('Failed to load expenses', err)
        setErrorMsg('Failed to load expenses from the server.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return
    api.deleteExpense(id)
      .then(() => {
        setItems(items.filter(i => i.id !== id))
      })
      .catch(err => {
        console.error('Delete failed', err)
        alert('Delete failed: ' + err.message)
      })
  }

  const columns = [
    { key: 'title', title: 'Title' },
    {
      key: 'category',
      title: 'Category',
      render: r => (
        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 uppercase tracking-wide">
          {r.category || 'Other'}
        </span>
      )
    },
    { key: 'description', title: 'Description' },
    {
      key: 'amount',
      title: 'Amount',
      render: r => (
        <span className="font-bold text-rose-600">
          -${(r.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      key: 'expenseDate',
      title: 'Date',
      render: r => {
        if (!r.expenseDate) return '-'
        return new Date(r.expenseDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
    }
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard size={28} className="text-rose-500" />
            <span>Expenses Ledger</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Track outgoing payments, corporate allocations, and daily expenses.</p>
        </div>
        <div>
          <Link
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            to="/expenses/new"
          >
            <Plus size={16} />
            <span>Add Expense</span>
          </Link>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 text-slate-500">
          <Loader2 size={36} className="animate-spin text-blue-600" />
          <span className="text-sm font-semibold">Loading ledger transactions...</span>
        </div>
      ) : (
        <Table
          columns={columns}
          data={items}
          renderRowActions={(r) => (
            <>
              <button
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                onClick={() => navigate(`/expenses/${r.id}/edit`)}
                title="Edit Expense"
              >
                <Edit size={16} />
              </button>
              <button
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                onClick={() => handleDelete(r.id)}
                title="Delete Expense"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        />
      )}
    </div>
  )
}
