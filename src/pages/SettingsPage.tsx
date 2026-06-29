import { useState } from 'react'
import { Bell, Globe, Shield, Webhook, Key, Lock, Save, Check, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'api'>('general')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-rt-text">Settings</h1>
        <p className="text-rt-muted text-sm">Manage your business preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-rt-border">
        {([
          { id: 'general', label: 'General', icon: Globe },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'api', label: 'API & Webhooks', icon: Key },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-rt-accent text-rt-accent'
                : 'border-transparent text-rt-muted hover:text-rt-text'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="max-w-2xl space-y-6">
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Business Information</h3>
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="rt-label">Business name</label>
                  <input type="text" defaultValue="Acme Studios" className="rt-input" />
                </div>
                <div>
                  <label className="rt-label">Industry</label>
                  <select className="rt-input">
                    <option>Software / Technology</option>
                    <option>E-commerce</option>
                    <option>Professional Services</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="rt-label">Business address</label>
                <input type="text" defaultValue="123 Innovation Drive, San Francisco, CA 94105" className="rt-input" />
              </div>
              <div>
                <label className="rt-label">Website</label>
                <input type="text" defaultValue="https://acme.studio" className="rt-input" />
              </div>
            </div>
          </div>

          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Currency & Region</h3>
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="rt-label">Default currency</label>
                  <select className="rt-input">
                    <option>rtUSD (USD-backed stablecoin)</option>
                    <option>USDC</option>
                  </select>
                </div>
                <div>
                  <label className="rt-label">Time zone</label>
                  <select className="rt-input">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="max-w-2xl space-y-6">
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Email Notifications</h3>
            <div className="space-y-4">
              {[
                { label: 'Large transactions', desc: 'When a transaction exceeds $5,000', checked: true },
                { label: 'Payment received', desc: 'When a payment link is paid', checked: true },
                { label: 'Card declined', desc: 'When a card authorization is declined', checked: true },
                { label: 'Team invites', desc: 'When someone joins your team', checked: false },
                { label: 'Weekly summary', desc: 'Every Monday with your weekly activity', checked: true },
              ].map((item, i) => (
                <label key={i} className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="mt-1 rounded border-rt-border" />
                  <div>
                    <p className="text-sm font-medium text-rt-text">{item.label}</p>
                    <p className="text-xs text-rt-muted">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="max-w-2xl space-y-6">
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">2FA is enabled</p>
                  <p className="text-xs text-green-600">Your account is protected with authenticator app</p>
                </div>
              </div>
              <button className="text-sm text-green-700 font-medium hover:underline">Manage</button>
            </div>
          </div>

          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Password</h3>
            <div className="space-y-4">
              <div>
                <label className="rt-label">Current password</label>
                <input type="password" placeholder="••••••••" className="rt-input" />
              </div>
              <div>
                <label className="rt-label">New password</label>
                <input type="password" placeholder="Min 8 characters" className="rt-input" />
              </div>
              <div>
                <label className="rt-label">Confirm new password</label>
                <input type="password" placeholder="Repeat password" className="rt-input" />
              </div>
            </div>
          </div>

          <div className="rt-card p-6 border-red-200">
            <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Danger zone
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-rt-text">Close account</p>
                <p className="text-xs text-rt-muted">This will permanently delete your account and all data</p>
              </div>
              <button className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
                Close account
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="max-w-2xl space-y-6">
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">API Keys</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rt-bg border border-rt-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-rt-text">Production key</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs font-mono bg-white p-2 rounded-lg border border-rt-border truncate">
                    rt_live_•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
                  </code>
                  <button className="p-2 rounded-lg hover:bg-white transition-colors">
                    <Lock className="w-4 h-4 text-rt-muted" />
                  </button>
                </div>
              </div>
              <button className="rt-btn-secondary text-sm">
                <Key className="w-4 h-4" /> Generate new key
              </button>
            </div>
          </div>

          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Webhook Endpoints</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rt-bg border border-rt-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-rt-text">Primary endpoint</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">Active</span>
                </div>
                <p className="text-xs text-rt-muted font-mono">https://api.acme.studio/webhooks/rt</p>
              </div>
              <button className="rt-btn-secondary text-sm">
                <Webhook className="w-4 h-4" /> Add endpoint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3">
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-medium">
            <Check className="w-4 h-4" /> Saved
          </div>
        )}
        <button onClick={handleSave} className="rt-btn-primary shadow-lg shadow-rt-accent/20">
          <Save className="w-4 h-4" /> Save changes
        </button>
      </div>
    </div>
  )
}
