import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CreditCard, Wallet, User } from 'lucide-react'

export default function Sidebar() {
  const menuItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/expenses', label: 'Expenses', icon: CreditCard },
    { to: '/incomes', label: 'Incomes', icon: Wallet },
    { to: '/profile', label: 'Profile', icon: User }
  ]

  return (
    <aside className="w-64 border-r border-slate-100 bg-white min-h-[calc(100vh-73px)] hidden md:block p-6">
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
