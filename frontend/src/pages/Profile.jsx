import React, { useEffect, useState } from 'react'
import { User, Mail, MapPin, Loader2, Save, BadgeCheck, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { api } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { logout, refreshProfile } = useAuth()
  const [profile, setProfile] = useState({ id: null, name: '', email: '', address: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api.getProfile()
      .then(d => {
        if (d) {
          setProfile({
            id: d.id,
            name: d.name || '',
            email: d.email || '',
            address: d.address || ''
          })
        }
      })
      .catch(err => {
        console.error('Failed to load profile details', err)
        setErrorMsg('Failed to load profile details.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  function save() {
    if (!profile.name || !profile.address) {
      setErrorMsg('Name and Address are required.')
      return
    }

    setSaving(true)
    setErrorMsg('')
    setSuccessMsg('')

    api.updateProfile(profile.id, {
      name: profile.name,
      address: profile.address
    })
      .then(res => {
        setSuccessMsg('Profile updated successfully!')
        if (res) {
          setProfile(p => ({ ...p, name: res.name || p.name, address: res.address || p.address }))
        }
        return refreshProfile()
      })
      .catch(err => {
        console.error('Failed to update profile', err)
        setErrorMsg(err.message || 'Failed to update profile.')
      })
      .finally(() => {
        setSaving(false)
      })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-75 gap-3 text-slate-500">
        <Loader2 size={36} className="animate-spin text-blue-600" />
        <span className="text-sm font-semibold">Loading profile information...</span>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <User size={28} className="text-blue-600" />
          <span>Profile Settings</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1">Manage your account information and default ledger details.</p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-medium flex items-center gap-2">
          <BadgeCheck size={16} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* User Card Header */}
        <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold uppercase shadow-sm">
            {profile.name ? profile.name.charAt(0) : <User size={28} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{profile.name || 'User'}</h3>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
              <Mail size={12} /> {profile.email}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <FormInput
            label="Full Name"
            value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
            placeholder="Jane Doe"
            required
          />

          <FormInput
            label="Email Address"
            type="email"
            value={profile.email}
            disabled
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm cursor-not-allowed"
          />

          <FormInput
            label="Address"
            value={profile.address}
            onChange={e => setProfile(p => ({ ...p, address: e.target.value }))}
            placeholder="Company or home address"
            required
          />

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-1.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save Profile</span>
                </>
              )}
            </button>
             <button
              onClick={() => {
                if (!profile.id) return
                if (!window.confirm('Delete your profile? This action cannot be undone.')) return
                setSaving(true)
                api.deleteProfile(profile.id)
                  .then(() => {
                    logout()
                    navigate('/')
                  })
                  .catch(err => {
                    console.error('Failed to delete profile', err)
                    setErrorMsg(err.message || 'Failed to delete profile.')
                  })
                  .finally(() => setSaving(false))
              }}
              disabled={saving}
              className="ml-3 flex items-center gap-1.5 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Trash2 size={14} />
              <span>Delete Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
