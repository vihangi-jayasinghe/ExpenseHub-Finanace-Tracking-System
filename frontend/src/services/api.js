const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function authHeader() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...authHeader(), ...(opts.headers || {}) }
  const res = await fetch(BASE + path, { ...opts, headers })
  
  if (res.status === 401) {
    localStorage.removeItem('token')
    if (typeof window !== 'undefined') {
      window.location.href = '/login?expired=true'
    }
    throw new Error('Session expired. Please log in again.')
  }

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  try { return await res.json() } catch (e) { return null }
}

export const api = {
  // auth
  login: (body) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/api/users', { method: 'POST', body: JSON.stringify(body) }),
  // removed forgot/reset password (OTP) endpoints — handled client-side or removed

  // dashboard
  getSummary: () => request('/api/dashboard/summary'),
  getRecent: (limit = 5) => request(`/api/dashboard/recent?limit=${limit}`),
  getMonthly: (month) => request(`/api/dashboard/monthly?month=${encodeURIComponent(month)}`),

  // expenses
  getExpenses: () => request('/api/expenses'),
  getExpense: (id) => request(`/api/expenses/${id}`),
  createExpense: (body) => request('/api/expenses', { method: 'POST', body: JSON.stringify(body) }),
  updateExpense: (id, body) => request(`/api/expenses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteExpense: (id) => request(`/api/expenses/${id}`, { method: 'DELETE' }),

  // incomes
  getIncomes: () => request('/api/income'),
  getIncome: (id) => request(`/api/income/${id}`),
  createIncome: (body) => request('/api/income', { method: 'POST', body: JSON.stringify(body) }),
  updateIncome: (id, body) => request(`/api/income/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteIncome: (id) => request(`/api/income/${id}`, { method: 'DELETE' }),

  // profile
  getProfile: () => request('/api/users/profile'),
  updateProfile: (id, body) => request(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProfile: (id) => request(`/api/users/${id}`, { method: 'DELETE' }),
}

export default api
