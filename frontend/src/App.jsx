import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import HomeContent from './HomeContent'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ExpenseList from './pages/ExpenseList'
import ExpenseForm from './pages/ExpenseForm'
import IncomeList from './pages/IncomeList'
import IncomeForm from './pages/IncomeForm'
import Profile from './pages/Profile'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Security from './pages/Security'
import About from './pages/About'
import TermsOfService from './pages/TermsOfService'
import MainLayout from './layouts/MainLayout'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        {/* Public landing/marketing page */}
        <Route path="/" element={<HomeContent />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Info pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        {/* Dashboard and related tracker pages under Layout shell */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expenses/new" element={<ExpenseForm />} />
          <Route path="/expenses/:id/edit" element={<ExpenseForm />} />
          <Route path="/incomes" element={<IncomeList />} />
          <Route path="/incomes/new" element={<IncomeForm />} />
          <Route path="/incomes/:id/edit" element={<IncomeForm />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}