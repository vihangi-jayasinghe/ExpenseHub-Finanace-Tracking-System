import React from 'react'

export default function FormInput({ label, error, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-xl border ${
          error ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
        } focus:outline-none focus:ring-4 text-slate-800 text-sm transition-all`}
        {...props}
      />
      {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
    </div>
  )
}
