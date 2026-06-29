import { useState } from 'react'
import { CreditCard, Plus, Trash2, Settings, Eye, EyeOff, ArrowUpRight, Copy, Snowflake } from 'lucide-react'
import { useDashboardStore } from '../stores'
import { formatCurrency } from '../utils'

const cardTransactions = [
  { id: 'ct1', merchant: 'Amazon Web Services', amount: '-$340.00', date: 'Jun 28, 2026', status: 'settled' },
  { id: 'ct2', merchant: 'Stripe', amount: '-$89.00', date: 'Jun 27, 2026', status: 'settled' },
  { id: 'ct3', merchant: 'Google Ads', amount: '-$1,200.00', date: 'Jun 26, 2026', status: 'settled' },
  { id: 'ct4', merchant: 'WeWork', amount: '-$450.00', date: 'Jun 25, 2026', status: 'settled' },
  { id: 'ct5', merchant: 'Slack', amount: '-$15.00', date: 'Jun 24, 2026', status: 'settled' },
]

export default function CardsPage() {
  const { cards } = useDashboardStore()
  const [selectedCard, setSelectedCard] = useState(cards[0])
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [showCreate, setShowCreate] = useState(false)

  const progress = (parseFloat(selectedCard.spentThisMonth.replace(/,/g, '')) / parseFloat(selectedCard.spendLimit.replace(/,/g, ''))) * 100

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-rt-text">Cards</h1>
          <p className="text-rt-muted text-sm">Manage virtual cards and spending</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="rt-btn-primary">
          <Plus className="w-4 h-4" /> Issue new card
        </button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-slide-up">
            <h3 className="text-xl font-bold text-rt-text mb-6">Issue virtual card</h3>
            <div className="space-y-5">
              <div>
                <label className="rt-label">Cardholder name</label>
                <input type="text" placeholder="Name on card" className="rt-input" />
              </div>
              <div>
                <label className="rt-label">Spend limit</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rt-muted text-lg">$</span>
                  <input type="number" placeholder="10,000" className="rt-input pl-8" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCreate(false)} className="rt-btn-secondary flex-1">Cancel</button>
                <button onClick={() => setShowCreate(false)} className="rt-btn-primary flex-1">Issue card</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Card List */}
        <div className="space-y-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedCard.id === card.id
                  ? 'border-rt-accent bg-rt-accent/5'
                  : 'border-rt-border hover:bg-rt-bg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    card.status === 'active' ? 'bg-green-50' : 'bg-slate-100'
                  }`}>
                    <CreditCard className={`w-5 h-5 ${card.status === 'active' ? 'text-green-600' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-rt-text">•••• {card.lastFour}</p>
                    <p className="text-xs text-rt-muted">{card.cardholderName}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  card.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'
                }`}>{card.status}</span>
              </div>
            </button>
          ))}
          <button onClick={() => setShowCreate(true)} className="w-full p-4 rounded-xl border border-dashed border-rt-border hover:border-rt-accent hover:bg-rt-bg transition-all text-center">
            <Plus className="w-5 h-5 text-rt-muted mx-auto mb-1" />
            <span className="text-sm text-rt-muted">Add new card</span>
          </button>
        </div>

        {/* Card Detail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Visual */}
          <div className="rt-card p-8 bg-gradient-to-br from-rt-dark to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rt-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/60 text-sm">RT Business</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${selectedCard.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-slate-500/20 text-slate-300'}`}>
                  {selectedCard.status}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-white/50 text-xs mb-1">Card number</p>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-mono tracking-wider">
                    {showCardNumber ? '4242 4242 4242 4242' : '•••• •••• •••• ' + selectedCard.lastFour}
                  </p>
                  <button onClick={() => setShowCardNumber(!showCardNumber)} className="text-white/50 hover:text-white transition-colors">
                    {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button className="text-white/50 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-8">
                <div>
                  <p className="text-white/50 text-xs mb-1">Expiry</p>
                  <p className="font-mono">{selectedCard.expiryMonth}/{selectedCard.expiryYear}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">CVC</p>
                  <p className="font-mono">{showCardNumber ? '123' : '•••'}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Cardholder</p>
                  <p className="text-sm">{selectedCard.cardholderName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Spend Limit */}
          <div className="rt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-rt-text">Spending this month</h3>
              <span className="text-sm text-rt-muted">{formatCurrency(selectedCard.spentThisMonth)} of {formatCurrency(selectedCard.spendLimit)}</span>
            </div>
            <div className="w-full h-3 bg-rt-bg rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-rt-accent rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-rt-muted">{progress.toFixed(0)}% of monthly limit used</p>
          </div>

          {/* Controls */}
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Card controls</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-rt-border hover:bg-rt-bg transition-colors">
                <Snowflake className="w-5 h-5 text-rt-muted" />
                <span className="text-xs text-rt-muted">Freeze</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-rt-border hover:bg-rt-bg transition-colors">
                <Settings className="w-5 h-5 text-rt-muted" />
                <span className="text-xs text-rt-muted">Limits</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-rt-border hover:bg-rt-bg transition-colors">
                <Eye className="w-5 h-5 text-rt-muted" />
                <span className="text-xs text-rt-muted">View PIN</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl border border-rt-border hover:bg-rt-bg transition-colors text-red-600">
                <Trash2 className="w-5 h-5" />
                <span className="text-xs">Cancel</span>
              </button>
            </div>
          </div>

          {/* Transactions */}
          <div className="rt-card p-6">
            <h3 className="font-semibold text-rt-text mb-4">Recent transactions</h3>
            <div className="space-y-3">
              {cardTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-rt-bg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-rt-danger" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-rt-text">{tx.merchant}</p>
                      <p className="text-xs text-rt-muted">{tx.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-rt-text">{tx.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
