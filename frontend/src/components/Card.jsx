import React from 'react'

export default function Card({ children, title, className = '' }) {
  return (
    <div className={`bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {title && (
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
          {title}
        </h4>
      )}
      <div className="text-slate-800">{children}</div>
    </div>
  )
}
