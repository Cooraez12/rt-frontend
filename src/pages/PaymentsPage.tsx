import { useState } from 'react'
import { Link2, Copy, Share2, Check, Plus, ExternalLink, TrendingUp, Eye } from 'lucide-react'
import { useDashboardStore } from '../stores'
import { formatCurrency } from '../utils'

const checkoutTransactions = [
  { id: 'c1', desc: 'Acme Invoice #42', amount: '$2,500.00', status: 'available', customer: 'john@client.com', date: 'Jun 28, 2026' },
  { id: 'c2', desc: 'Consulting hourly', amount: '$500.00', status: 'pending', customer: 'sarah@design.co', date: 'Jun 28, 2026' },
  { id: 'c3', desc: 'Acme Invoice #42', amount: '$2,500.00', status: 'available', customer: 'mike@tech.io', date: 'Jun 27, 2026' },
  { id: 'c4', desc: 'Consulting hourly', amount: '$500.00', status: 'available', customer: 'alex@startup.com', date: 'Jun 26, 2026' },
  { id: 'c5', desc: 'Acme Invoice #42', amount: '$2,500.00', status: 'failed', customer: 'tom@old.com', date: 'Jun 25, 2026' },
]

export default function PaymentsPage() {
  const { paymentLinks } = useDashboardStore()
  const [showCreate, setShowCreate] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [newAmount, setNewAmount] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(`https://rt.app/pay/${code}`)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCreate = () => {
    setShowCreate(false)
    setNewAmount('')
    setNewDesc('')
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-rt-text">Payments</h1>
          <p className="text-rt-muted text-sm">Create payment links and manage checkout</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="rt-btn-primary">
          <Plus className="w-4 h-4" /> New payment link
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rt-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-rt-muted text-sm">Total volume</span>
            <TrendingUp className="w-5 h-5 text-rt-success" />
          </div>
          <p className="text-2xl font-bold text-rt-text">$13,500.00</p>
          <p className="text-xs text-rt-success mt-1">+24% this month</p>
        </div>
        <div className="rt-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-rt-muted text-sm">Active links</span>
            <Link2 className="w-5 h-5 text-rt-accent" />
          </div>
          <p className="text-2xl font-bold text-rt-text">2</p>
          <p className="text-xs text-rt-muted mt-1">15 payments total</p>
        </div>
        <div className="rt-card p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-rt-muted text-sm">Conversion rate</span>
            <Eye className="w-5 h-5 text-rt-secondary" />
          </div>
          <p className="text-2xl font-bold text-rt-text">78%</p>
          <p className="text-xs text-rt-success mt-1">+5% vs last month</p>
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-slide-up">
            <h3 className="text-xl font-bold text-rt-text mb-6">Create payment link</h3>
            <div className="space-y-5">
              <div>
                <label className="rt-label">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rt-muted text-lg">$</span>
                  <input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder="0.00" className="rt-input pl-8" />
                </div>
              </div>
              <div>
                <label className="rt-label">Description</label>
                <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="What is this for?" className="rt-input" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCreate(false)} className="rt-btn-secondary flex-1">Cancel</button>
                <button onClick={handleCreate} className="rt-btn-primary flex-1">Create link</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Links */}
      <div className="rt-card p-6">
        <h3 className="font-semibold text-rt-text mb-6">Payment Links</h3>
        <div className="space-y-4">
          {paymentLinks.map((pl) => (
            <div key={pl.id} className="flex items-center justify-between p-4 rounded-xl border border-rt-border hover:bg-rt-bg transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rt-accent/10 flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-rt-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-rt-text">{pl.description}</p>
                  <p className="text-xs text-rt-muted">{pl.totalPayments} payments · {formatCurrency(pl.totalVolume)} total</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-4">
                  <p className="text-sm font-medium text-rt-text">{formatCurrency(pl.amount)}</p>
                  <span className={`text-xs ${pl.status === 'active' ? 'rt-status-available' : 'rt-status-failed'}`}>{pl.status}</span>
                </div>
                <button
                  onClick={() => handleCopy(pl.code)}
                  className="p-2 rounded-lg hover:bg-rt-bg transition-colors"
                  title="Copy link"
                >
                  {copied === pl.code ? <Check className="w-4 h-4 text-rt-success" /> : <Copy className="w-4 h-4 text-rt-muted" />}
                </button>
                <button className="p-2 rounded-lg hover:bg-rt-bg transition-colors" title="Share">
                  <Share2 className="w-4 h-4 text-rt-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-rt-bg transition-colors" title="Preview">
                  <ExternalLink className="w-4 h-4 text-rt-muted" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Transactions */}
      <div className="rt-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-rt-text">Checkout Transactions</h3>
          <select className="rt-input text-sm py-2 w-32">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rt-border">
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Description</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Customer</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Date</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Status</th>
                <th className="text-right text-xs font-medium text-rt-muted py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {checkoutTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-rt-border hover:bg-rt-bg transition-colors">
                  <td className="py-4 px-4 text-sm text-rt-text">{tx.desc}</td>
                  <td className="py-4 px-4 text-sm text-rt-muted">{tx.customer}</td>
                  <td className="py-4 px-4 text-sm text-rt-muted">{tx.date}</td>
                  <td className="py-4 px-4">
                    <span className={`rt-status-badge ${
                      tx.status === 'available' ? 'rt-status-available' :
                      tx.status === 'pending' ? 'rt-status-pending' :
                      'rt-status-failed'
                    }`}>{tx.status}</span>
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-medium text-rt-text">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
