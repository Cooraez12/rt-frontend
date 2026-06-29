import { useState } from 'react'
import { Plus, Mail, Shield, User, MoreHorizontal, X, Check } from 'lucide-react'
import { useDashboardStore } from '../stores'

const roleLabels: Record<string, string> = {
  owner: 'Owner',
  admin: 'Admin',
  finance: 'Finance',
  developer: 'Developer',
  viewer: 'Viewer',
}

const roleColors: Record<string, string> = {
  owner: 'bg-purple-50 text-purple-700',
  admin: 'bg-blue-50 text-blue-700',
  finance: 'bg-green-50 text-green-700',
  developer: 'bg-orange-50 text-orange-700',
  viewer: 'bg-slate-50 text-slate-700',
}

export default function TeamPage() {
  const { teamMembers } = useDashboardStore()
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('viewer')

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-rt-text">Team</h1>
          <p className="text-rt-muted text-sm">Manage members and permissions</p>
        </div>
        <button onClick={() => setShowInvite(true)} className="rt-btn-primary">
          <Plus className="w-4 h-4" /> Invite member
        </button>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-slide-up">
            <h3 className="text-xl font-bold text-rt-text mb-6">Invite team member</h3>
            <div className="space-y-5">
              <div>
                <label className="rt-label">Email address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-rt-muted" />
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="rt-input pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="rt-label">Role</label>
                <div className="space-y-2">
                  {[
                    { value: 'admin', label: 'Admin', desc: 'Full access except billing' },
                    { value: 'finance', label: 'Finance', desc: 'Manage transfers and view balances' },
                    { value: 'developer', label: 'Developer', desc: 'API keys and webhooks' },
                    { value: 'viewer', label: 'Viewer', desc: 'View-only access' },
                  ].map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setInviteRole(r.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        inviteRole === r.value
                          ? 'border-rt-accent bg-rt-accent/5'
                          : 'border-rt-border hover:bg-rt-bg'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        inviteRole === r.value ? 'border-rt-accent' : 'border-rt-border'
                      }`}>
                        {inviteRole === r.value && <div className="w-2.5 h-2.5 rounded-full bg-rt-accent" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-rt-text">{r.label}</p>
                        <p className="text-xs text-rt-muted">{r.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowInvite(false)} className="rt-btn-secondary flex-1">Cancel</button>
                <button onClick={() => setShowInvite(false)} className="rt-btn-primary flex-1">Send invite</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rt-card p-6">
          <span className="text-rt-muted text-sm">Total members</span>
          <p className="text-2xl font-bold text-rt-text mt-2">{teamMembers.length}</p>
        </div>
        <div className="rt-card p-6">
          <span className="text-rt-muted text-sm">Active</span>
          <p className="text-2xl font-bold text-rt-text mt-2">{teamMembers.filter(m => m.status === 'active').length}</p>
        </div>
        <div className="rt-card p-6">
          <span className="text-rt-muted text-sm">Pending invites</span>
          <p className="text-2xl font-bold text-rt-text mt-2">{teamMembers.filter(m => m.status === 'pending').length}</p>
        </div>
      </div>

      {/* Members List */}
      <div className="rt-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rt-border">
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Member</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Role</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Status</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Joined</th>
                <th className="text-right text-xs font-medium text-rt-muted py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-rt-border hover:bg-rt-bg transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rt-accent/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-rt-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-rt-text">{member.name}</p>
                        <p className="text-xs text-rt-muted">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${roleColors[member.role]}`}>
                      <Shield className="w-3 h-3" />
                      {roleLabels[member.role]}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      member.status === 'active' ? 'bg-green-50 text-green-700' :
                      member.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-slate-50 text-slate-700'
                    }`}>
                      {member.status === 'active' && <Check className="w-3 h-3" />}
                      {member.status === 'pending' && <X className="w-3 h-3" />}
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-rt-muted">{member.joinedAt}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-rt-bg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-rt-muted" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
