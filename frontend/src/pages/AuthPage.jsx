import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  MapPin,
  ShieldCheck,
  BarChart3,
  HelpCircle,
  Globe,
  Eye,
  EyeOff,
  Wallet,
} from "lucide-react";


export default function AuthPage({ onLogin, onRegister }) {
  const [activeTab, setActiveTab] = useState("login"); // "login" | "register"

  return (
    <div className="min-h-screen w-full flex bg-slate-100">
      {/* LEFT — Brand / hero panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95" />

        <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
              <Wallet className="w-5 h-5 text-slate-900" />
            </div>
            <span className="font-semibold tracking-wide text-sm">
              ExpenseHub
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Master your spending with corporate precision.
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Access a{" "}
              <span className="text-fuchsia-400 font-medium">
                high-stakes financial environment
              </span>{" "}
              engineered for clarity and trust. Track every transaction,
              manage your budgets, and generate detailed expense reports in
              one centralized dashboard.
            </p>

            <div className="flex gap-10">
              <div>
                <ShieldCheck className="w-5 h-5 text-sky-400 mb-2" />
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Secure Vault
                </p>
                <p className="text-xs text-slate-400">
                  Bank-grade encryption for all data.
                </p>
              </div>
              <div>
                <BarChart3 className="w-5 h-5 text-fuchsia-400 mb-2" />
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Real-Time Analytics
                </p>
                <p className="text-xs text-slate-400">
                  Instant insights on expenditure.
                </p>
              </div>
            </div>
          </div>

          <div /> {/* spacer to balance flex layout */}
        </div>
      </div>

      {/* RIGHT — Auth card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 px-6 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
              <TabButton
                label="Login"
                active={activeTab === "login"}
                onClick={() => setActiveTab("login")}
              />
              <TabButton
                label="Register"
                active={activeTab === "register"}
                onClick={() => setActiveTab("register")}
              />
            </div>

            {activeTab === "login" ? (
              <LoginForm onSubmit={onLogin} switchToRegister={() => setActiveTab("register")} />
            ) : (
              <RegisterForm onSubmit={onRegister} switchToLogin={() => setActiveTab("login")} />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> English (US)
            </span>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-3">
            © 2026 ExpenseHub. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- */
/* Tab Button                         */
/* ---------------------------------- */
function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 pb-3 text-sm font-semibold tracking-wide uppercase transition-colors relative ${
        active ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-slate-900 rounded-full" />
      )}
    </button>
  );
}

/* ---------------------------------- */
/* Input field                        */
/* ---------------------------------- */
function FieldLabel({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {children}
      </label>
      {action}
    </div>
  );
}

function IconInput({ icon: Icon, type = "text", placeholder, value, onChange, name, rightSlot }) {
  return (
    <div className="relative">
      <Icon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-9 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
      />
      {rightSlot && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
      )}
    </div>
  );
}

/* ---------------------------------- */
/* Login Form                         */
/* ---------------------------------- */
function LoginForm({ onSubmit, switchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    try {
      setLoading(true);
      await onSubmit?.({ ...form, remember });
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome back</h2>
      <p className="text-sm text-slate-500 mb-6">
        Enter your credentials to access your dashboard.
      </p>

      <div className="mb-4">
        <FieldLabel>Email address</FieldLabel>
        <IconInput
          icon={Mail}
          type="email"
          name="email"
          placeholder="name@company.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <FieldLabel
          action={
            <button
              type="button"
              className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
            >
              Forgot password?
            </button>
          }
        >
          Password
        </FieldLabel>
        <IconInput
          icon={Lock}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
        />
      </div>

      <label className="flex items-center gap-2 mt-4 mb-6 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-slate-300"
        />
        <span className="text-xs text-slate-500">Remember this device</span>
      </label>

      {error && (
        <p className="text-xs text-rose-600 mb-4 bg-rose-50 border border-rose-100 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-lg transition"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-xs text-slate-500 mt-5">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={switchToRegister}
          className="font-semibold text-slate-900 hover:underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}

/* ---------------------------------- */
/* Register Form                      */
/* (fields match User entity: name,   */
/*  email, address, password)         */
/* ---------------------------------- */
function RegisterForm({ onSubmit, switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Name, email, and password are required.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      // Only send fields the backend User entity expects
      const { confirmPassword, ...payload } = form;
      await onSubmit?.(payload);
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-slate-900 mb-1">
        Create your account
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Set up your workspace to start tracking expenses.
      </p>

      <div className="mb-4">
        <FieldLabel>Full name</FieldLabel>
        <IconInput
          icon={User}
          name="name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <FieldLabel>Email address</FieldLabel>
        <IconInput
          icon={Mail}
          type="email"
          name="email"
          placeholder="name@company.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <FieldLabel>Address (optional)</FieldLabel>
        <IconInput
          icon={MapPin}
          name="address"
          placeholder="123 Main Street, Colombo"
          value={form.address}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <FieldLabel>Password</FieldLabel>
        <IconInput
          icon={Lock}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={handleChange}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
        />
      </div>

      <div className="mb-2">
        <FieldLabel>Confirm password</FieldLabel>
        <IconInput
          icon={Lock}
          type={showConfirm ? "text" : "password"}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={handleChange}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
        />
      </div>

      {error && (
        <p className="text-xs text-rose-600 my-4 bg-rose-50 border border-rose-100 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white text-sm font-semibold py-2.5 rounded-lg transition mt-4"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

      <p className="text-center text-xs text-slate-500 mt-5">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="font-semibold text-slate-900 hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}