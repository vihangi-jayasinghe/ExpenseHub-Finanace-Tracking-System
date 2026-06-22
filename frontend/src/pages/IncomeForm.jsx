import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Wallet, ArrowLeft, Loader2, Save } from 'lucide-react'
import FormInput from '../components/FormInput'
import { api } from '../services/api'

export default function IncomeForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    source: '',
    amount: '',
    incomeDate: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (id) {
      setLoading(true)
      api.getIncome(id)
        .then(d => {
          if (d) {
            setForm({
              source: d.source || '',
              amount: d.amount !== undefined ? String(d.amount) : '',
              incomeDate: d.incomeDate || '',
              description: d.description || ''
            })
          }
        })
        .catch(err => {
          console.error('Failed to load income details', err)
          setErrorMsg('Failed to load transaction details.')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id])

  function change(k, v) {
    setForm(f => ({ ...f, [k]: v }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.source || !form.amount || !form.incomeDate || !form.description) {
      setErrorMsg('All fields are required.')
      return
    }

    const amountVal = parseFloat(form.amount)
    if (isNaN(amountVal) || amountVal <= 0) {
      setErrorMsg('Amount must be a positive number.')
      return
    }

    setSaving(true)
    setErrorMsg('')

    const body = {
      source: form.source,
      amount: amountVal,
      incomeDate: form.incomeDate,
      description: form.description
    }

    const call = id ? api.updateIncome(id, body) : api.createIncome(body)

    call
      .then(() => {
        navigate('/incomes')
      })
      .catch(err => {
        console.error('Save failed', err)
        setErrorMsg(err.message || 'Failed to save transaction.')
      })
      .finally(() => {
        setSaving(false)
      })
  }

  const sources = [
    'Salary',
    'Freelance',
    'Investments',
    'Bonus',
    'Gifts',
    'Rent Income',
    'Refunds',
    'Other'
  ]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-75 gap-3 text-slate-500">
        <Loader2 size={36} className="animate-spin text-blue-600" />
        <span className="text-sm font-semibold">Retrieving transaction details...</span>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/incomes')}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {id ? 'Edit Income' : 'Add New Income'}
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {id ? 'Modify transaction fields.' : 'Register a new credit entry in the system.'}
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Source
              </label>
              <select
                value={form.source}
                onChange={e => change('source', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-blue-100 focus:outline-none focus:ring-4 text-slate-800 text-sm bg-white transition-all"
                required
              >
                <option value="">Select a source</option>
                {sources.map(src => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              label="Amount (Rs.)"
              type="number"
              step="0.01"
              value={form.amount}
              onChange={e => change('amount', e.target.value)}
              placeholder="e.g. 5000.00"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput
              label="Date"
              type="date"
              value={form.incomeDate}
              onChange={e => change('incomeDate', e.target.value)}
              required
            />
          </div>

          <FormInput
            label="Description"
            value={form.description}
            onChange={e => change('description', e.target.value)}
            placeholder="Provide detail about this income..."
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/incomes')}
              className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-850 hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save Transaction</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
