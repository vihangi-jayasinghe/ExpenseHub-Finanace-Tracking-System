import React from 'react'

export default function Table({ columns, data = [], renderRowActions }) {
  return (
    <div className="overflow-hidden border border-slate-200/60 rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map((c) => (
                <th key={c.key} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {c.title}
                </th>
              ))}
              {renderRowActions && (
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (renderRowActions ? 1 : 0)}
                  className="px-6 py-8 text-center text-slate-400 font-medium"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map((c) => (
                    <td key={c.key} className="px-6 py-4 whitespace-nowrap font-medium text-slate-800">
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                  {renderRowActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        {renderRowActions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
