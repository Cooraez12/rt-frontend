import { useState } from 'react'
import { ArrowUpRight, ArrowDownRight, Copy, Wallet, Clock, Lock, Shield, Download, Eye } from 'lucide-react'
import { useDashboardStore } from '../stores'
import { formatCurrency } from '../utils'

const transactions = [
  { id: 'tx1', type: 'deposit', desc: 'ACH deposit from Chase', amount: '+$12,500.00', rawAmount: '12500', status: 'available', date: 'Jun 28, 2026', time: '2:30 PM' },
  { id: 'tx2', type: 'payment', desc: 'Payment link: Invoice #42', amount: '+$2,500.00', rawAmount: '2500', status: 'available', date: 'Jun 28, 2026', time: '11:15 AM' },
  { id: 'tx3', type: 'withdrawal', desc: 'Wire to Silicon Valley Bank', amount: '-$8,000.00', rawAmount: '-8000', status: 'processing', date: 'Jun 27, 2026', time: '4:45 PM' },
  { id: 'tx4', type: 'card', desc: 'Card auth at AWS', amount: '-$340.00', rawAmount: '-340', status: 'hold', date: 'Jun 27, 2026', time: '10:22 AM' },
  { id: 'tx5', type: 'reserve', desc: 'Risk reserve: Checkout #123', amount: '-$500.00', rawAmount: '-500', status: 'reserved', date: 'Jun 26, 2026', time: '3:00 PM' },
  { id: 'tx6', type: 'payment', desc: 'Payment link: Consulting', amount: '+$500.00', rawAmount: '500', status: 'pending', date: 'Jun 26, 2026', time: '9:00 AM' },
  { id: 'tx7', type: 'conversion', desc: 'USDC → rtUSD', amount: '+$5,000.00', rawAmount: '5000', status: 'available', date: 'Jun 25, 2026', time: '2:00 PM' },
  { id: 'tx8', type: 'fee', desc: 'Monthly card fee', amount: '-$5.00', rawAmount: '-5', status: 'available', date: 'Jun 25, 2026', time: '12:00 AM' },
]

export default function AccountsPage() {
  const { accounts, selectedAccountId, setSelectedAccount } = useDashboardStore()
  const [showDetails, setShowDetails] = useState(false)
  const selectedAccount = accounts.find(a => a.id === selectedAccountId) || accounts[0]

  const statusBadge = (status: string) => {
    const classes: Record<string, string> = {
      available: 'rt-status-available',
      pending: 'rt-status-pending',
      processing: 'rt-status-processing',
      failed: 'rt-status-failed',
      hold: 'rt-status-hold',
      reserved: 'rt-status-reserved',
    }
    return <span className={`rt-status-badge ${classes[status] || 'rt-status-available'}`}>{status}</span>
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-rt-text">Accounts</h1>
          <p className="text-rt-muted text-sm">Manage your balances and transactions</p>
        </div>
        <button className="rt-btn-secondary text-sm">
          <Download className="w-4 h-4" /> Export statement
        </button>
      </div>

      <div className="flex gap-3">
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => setSelectedAccount(account.id)}
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              selectedAccountId === account.id
                ? 'bg-rt-dark text-white shadow-lg'
                : 'bg-white text-rt-muted border border-rt-border hover:text-rt-text'
            }`}
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              {account.name}
            </div>
          </button>
        ))}
      </div>

      <div className="rt-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-rt-muted text-sm">{selectedAccount?.name}</p>
            <p className="text-3xl font-bold text-rt-text mt-1">{formatCurrency(selectedAccount?.balance.balance || '0')}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowDetails(!showDetails)} className="rt-btn-ghost">
              <Eye className="w-4 h-4" /> {showDetails ? 'Hide' : 'Show'} details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Available', value: selectedAccount?.balance.availableBalance, color: 'text-green-600', bg: 'bg-green-50', icon: Wallet },
            { label: 'Pending', value: selectedAccount?.balance.pendingBalance, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
            { label: 'On Hold', value: selectedAccount?.balance.holdBalance, color: 'text-blue-600', bg: 'bg-blue-50', icon: Lock },
            { label: 'Reserved', value: selectedAccount?.balance.reservedBalance, color: 'text-purple-600', bg: 'bg-purple-50', icon: Shield },
          ].map((b) => (
            <div key={b.label} className={`${b.bg} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <b.icon className={`w-4 h-4 ${b.color}`} />
                <span className="text-xs text-rt-muted">{b.label}</span>
              </div>
              <p className={`font-semibold ${b.color}`}>{formatCurrency(b.value || '0')}</p>
            </div>
          ))}
        </div>

        {showDetails && (
          <div className="mt-6 pt-6 border-t border-rt-border">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-rt-muted mb-1">Account number</p>
                <div className="flex items-center gap-2">
                  <p className="text-rt-text font-mono">{selectedAccount?.accountNumber}</p>
                  <button className="text-rt-muted hover:text-rt-text"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
              <div>
                <p className="text-sm text-rt-muted mb-1">Routing number</p>
                <div className="flex items-center gap-2">
                  <p className="text-rt-text font-mono">{selectedAccount?.routingNumber}</p>
                  <button className="text-rt-muted hover:text-rt-text"><Copy className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rt-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-rt-text">Transaction History</h3>
          <div className="flex gap-2">
            <select className="rt-input text-sm py-2 w-32">
              <option>All types</option>
              <option>Deposits</option>
              <option>Withdrawals</option>
              <option>Payments</option>
              <option>Cards</option>
            </select>
            <select className="rt-input text-sm py-2 w-32">
              <option>All statuses</option>
              <option>Available</option>
              <option>Pending</option>
              <option>Processing</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rt-border">
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Transaction</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Date</th>
                <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Status</th>
                <th className="text-right text-xs font-medium text-rt-muted py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-rt-border hover:bg-rt-bg transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        tx.amount.startsWith('+') ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {tx.amount.startsWith('+') ? (
                          <ArrowDownRight className="w-4 h-4 text-rt-success" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-rt-danger" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-rt-text">{tx.desc}</p>
                        <p className="text-xs text-rt-muted">{tx.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-rt-muted">{tx.date}</td>
                  <td className="py-4 px-4">{statusBadge(tx.status)}</td>
                  <td className="py-4 px-4 text-right">
                    <p className={`text-sm font-medium ${tx.amount.startsWith('+') ? 'text-rt-success' : 'text-rt-text'}`}>
                      {tx.amount}
                    </p>
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
