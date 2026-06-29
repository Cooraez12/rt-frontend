import { useState } from 'react'
import { ArrowUpRight, Banknote, Building2, Wallet, ChevronRight, Check, AlertCircle } from 'lucide-react'
import { useDashboardStore } from '../stores'
import { formatCurrency } from '../utils'

const savedRecipients = [
  { id: 'r1', name: 'Silicon Valley Bank', account: '****4567', type: 'bank' },
  { id: 'r2', name: 'Stripe Treasury', account: '****8901', type: 'bank' },
  { id: 'r3', name: 'Acme Studios', account: '****1234', type: 'rt' },
]

export default function TransfersPage() {
  const [mode, setMode] = useState<'send' | 'request'>('send')
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [step, setStep] = useState(1)
  const { accounts } = useDashboardStore()
  const primaryAccount = accounts[0]

  const available = parseFloat(primaryAccount?.balance.availableBalance.replace(/,/g, '') || '0')
  const requestedAmount = parseFloat(amount) || 0
  const hasEnough = available >= requestedAmount

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2)
    } else {
      setStep(3)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-rt-text">Transfers</h1>
        <p className="text-rt-muted text-sm">Send or request money instantly</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 bg-white rounded-xl p-1 border border-rt-border w-fit">
        <button
          onClick={() => { setMode('send'); setStep(1) }}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            mode === 'send' ? 'bg-rt-dark text-white' : 'text-rt-muted hover:text-rt-text'
          }`}
        >
          Send money
        </button>
        <button
          onClick={() => { setMode('request'); setStep(1) }}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            mode === 'request' ? 'bg-rt-dark text-white' : 'text-rt-muted hover:text-rt-text'
          }`}
        >
          Request money
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2 rt-card p-6">
          {step === 3 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-rt-success" />
              </div>
              <h3 className="text-xl font-bold text-rt-text mb-2">Transfer initiated</h3>
              <p className="text-rt-muted mb-6">${amount} will be sent to {recipient}</p>
              <button onClick={() => { setStep(1); setAmount(''); setRecipient('') }} className="rt-btn-primary">
                Send another
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {step === 1 && (
                <>
                  <div>
                    <label className="rt-label">From</label>
                    <div className="rt-card p-4 bg-rt-bg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Wallet className="w-5 h-5 text-rt-accent" />
                          <div>
                            <p className="text-sm font-medium text-rt-text">{primaryAccount?.name}</p>
                            <p className="text-xs text-rt-muted">Available: {formatCurrency(primaryAccount?.balance.availableBalance || '0')}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-rt-muted" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="rt-label">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rt-muted text-lg">$</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="rt-input pl-8 text-lg font-mono"
                      />
                    </div>
                    {!hasEnough && amount && (
                      <div className="flex items-center gap-2 mt-2 text-rt-danger text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Insufficient available balance. You have {formatCurrency(primaryAccount?.balance.availableBalance || '0')} available.
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="rt-label">To</label>
                    <div className="space-y-2">
                      {savedRecipients.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setRecipient(r.name)}
                          className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                            recipient === r.name
                              ? 'border-rt-accent bg-rt-accent/5'
                              : 'border-rt-border hover:bg-rt-bg'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-rt-bg flex items-center justify-center">
                            {r.type === 'bank' ? <Building2 className="w-5 h-5 text-rt-muted" /> : <Wallet className="w-5 h-5 text-rt-accent" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-rt-text">{r.name}</p>
                            <p className="text-xs text-rt-muted">{r.account}</p>
                          </div>
                          {recipient === r.name && <Check className="w-5 h-5 text-rt-accent" />}
                        </button>
                      ))}
                      <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-dashed border-rt-border hover:border-rt-accent hover:bg-rt-bg transition-all text-left">
                        <Banknote className="w-5 h-5 text-rt-muted" />
                        <span className="text-sm text-rt-muted">Add new recipient</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!amount || !recipient || !hasEnough}
                    className="rt-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="font-semibold text-rt-text mb-4">Review transfer</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-3 border-b border-rt-border">
                      <span className="text-rt-muted">From</span>
                      <span className="text-rt-text font-medium">{primaryAccount?.name}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-rt-border">
                      <span className="text-rt-muted">To</span>
                      <span className="text-rt-text font-medium">{recipient}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-rt-border">
                      <span className="text-rt-muted">Amount</span>
                      <span className="text-rt-text font-medium">{formatCurrency(amount)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-rt-border">
                      <span className="text-rt-muted">Fee</span>
                      <span className="text-rt-success font-medium">Free</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-rt-text font-semibold">Total</span>
                      <span className="text-rt-text font-bold">{formatCurrency(amount)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="rt-btn-secondary flex-1">Back</button>
                    <button onClick={handleSubmit} className="rt-btn-primary flex-1">
                      <ArrowUpRight className="w-4 h-4" /> Confirm & send
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Transfer limits</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-rt-muted">Per transfer</span>
                <span className="text-rt-text font-medium">$50,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-rt-muted">Daily</span>
                <span className="text-rt-text font-medium">$100,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-rt-muted">Monthly</span>
                <span className="text-rt-text font-medium">$500,000</span>
              </div>
            </div>
          </div>
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Settlement speed</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-rt-muted">RT to RT: Instant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-rt-muted">ACH: 1-2 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-rt-muted">Wire: Same day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
