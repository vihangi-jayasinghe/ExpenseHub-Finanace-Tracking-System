import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Wallet, Trash2, Edit, Plus, Loader2, FileText } from 'lucide-react'
import Table from '../components/Table'
import { api } from '../services/api'
import { exportStatementPDF } from '../utils/pdfGenerator'

export default function IncomeList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadIncomes()
  }, [])

  function loadIncomes() {
    setLoading(true)
    setErrorMsg('')
    api.getIncomes()
      .then(res => {
        setItems(res || [])
      })
      .catch(err => {
        console.error('Failed to load income records', err)
        setErrorMsg('Failed to load income from the server.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleExportPDF() {
    if (items.length === 0) {
      alert('No income records to export.')
      return
    }

    const headers = ['Date', 'Source', 'Description', 'Amount (Rs.)']
    const rows = items.map(item => [
      item.incomeDate ? new Date(item.incomeDate).toLocaleDateString() : '-',
      item.source || '',
      item.description || '',
      parseFloat(item.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    ])

    const totalVal = items.reduce((sum, i) => sum + parseFloat(i.amount || 0), 0)
      .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    exportStatementPDF({
      title: 'Income ledger Statement',
      filename: `income_statement_${new Date().toISOString().split('T')[0]}.pdf`,
      headers,
      rows,
      summaryLabel: 'Total Income Inflow',
      summaryValue: totalVal
    })
  }

  function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this income record?')) return
    api.deleteIncome(id)
      .then(() => {
        setItems(items.filter(i => i.id !== id))
      })
      .catch(err => {
        console.error('Delete failed', err)
        alert('Delete failed: ' + err.message)
      })
  }

  const columns = [
    { key: 'source', title: 'Source' },
    { key: 'description', title: 'Description' },
    {
      key: 'amount',
      title: 'Amount',
      render: r => (
        <span className="font-bold text-emerald-600">
          +Rs.{(r.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      )
    },
    {
      key: 'incomeDate',
      title: 'Date',
      render: r => {
        if (!r.incomeDate) return '-'
        return new Date(r.incomeDate).toLocaleDateString('en-US', {
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
            <Wallet size={28} className="text-emerald-500" />
            <span>Income Ledger</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1">Track incoming salaries, dividends, freelance tasks, and external funding.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <FileText size={14} />
            <span>Export PDF</span>
          </button>
          <Link
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            to="/incomes/new"
          >
            <Plus size={16} />
            <span>Add Income</span>
          </Link>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-75 gap-3 text-slate-500">
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
                onClick={() => navigate(`/incomes/${r.id}/edit`)}
                title="Edit Income"
              >
                <Edit size={16} />
              </button>
              <button
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                onClick={() => handleDelete(r.id)}
                title="Delete Income"
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
