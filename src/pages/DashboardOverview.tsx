import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowDownRight, TrendingUp, Clock, Link2, CreditCard } from 'lucide-react'
import { useDashboardStore } from '../stores'
import { formatCurrency } from '../utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { day: 'Mon', volume: 4200 },
  { day: 'Tue', volume: 6800 },
  { day: 'Wed', volume: 5400 },
  { day: 'Thu', volume: 8900 },
  { day: 'Fri', volume: 11200 },
  { day: 'Sat', volume: 7600 },
  { day: 'Sun', volume: 9500 },
]

const recentActivity = [
  { id: '1', type: 'payment', desc: 'Payment from Acme Corp', amount: '+$2,500.00', status: 'available', time: '2 min ago' },
  { id: '2', type: 'card', desc: 'Card purchase at AWS', amount: '-$340.00', status: 'available', time: '1 hour ago' },
  { id: '3', type: 'transfer', desc: 'ACH transfer to Wells Fargo', amount: '-$5,000.00', status: 'processing', time: '3 hours ago' },
  { id: '4', type: 'payment', desc: 'Payment link: Invoice #42', amount: '+$1,200.00', status: 'pending', time: '5 hours ago' },
  { id: '5', type: 'card', desc: 'Card purchase at Stripe', amount: '-$89.00', status: 'available', time: 'Yesterday' },
]

export default function DashboardOverview() {
  const { accounts } = useDashboardStore()
  const navigate = useNavigate()
  const primaryAccount = accounts[0]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-rt-text">Overview</h1>
          <p className="text-rt-muted text-sm">Welcome back, here's what's happening today</p>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Primary Balance Card */}
        <div className="lg:col-span-2 rt-card p-8 bg-gradient-to-br from-rt-dark to-slate-800 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Total Balance</span>
            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">{primaryAccount?.currency}</span>
          </div>
          <div className="text-4xl font-bold mb-6">{formatCurrency(primaryAccount?.balance.balance || '0')}</div>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Available', value: primaryAccount?.balance.availableBalance || '0', color: 'text-green-400' },
              { label: 'Pending', value: primaryAccount?.balance.pendingBalance || '0', color: 'text-yellow-400' },
              { label: 'On Hold', value: primaryAccount?.balance.holdBalance || '0', color: 'text-blue-400' },
              { label: 'Reserved', value: primaryAccount?.balance.reservedBalance || '0', color: 'text-purple-400' },
            ].map((b) => (
              <div key={b.label}>
                <p className="text-white/50 text-xs mb-1">{b.label}</p>
                <p className={`font-semibold text-sm ${b.color}`}>{formatCurrency(b.value)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rt-card p-6">
          <h3 className="font-semibold text-rt-text mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button onClick={() => navigate('/transfers')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rt-bg transition-colors text-left">
              <div className="w-10 h-10 rounded-lg bg-rt-accent/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-rt-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-rt-text">Send money</p>
                <p className="text-xs text-rt-muted">Transfer to bank or account</p>
              </div>
            </button>
            <button onClick={() => navigate('/payments')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rt-bg transition-colors text-left">
              <div className="w-10 h-10 rounded-lg bg-rt-secondary/10 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-rt-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-rt-text">Request payment</p>
                <p className="text-xs text-rt-muted">Create a payment link</p>
              </div>
            </button>
            <button onClick={() => navigate('/cards')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rt-bg transition-colors text-left">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-rt-text">New card</p>
                <p className="text-xs text-rt-muted">Issue a virtual card</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'This month', value: '$34,240', change: '+12.5%', icon: TrendingUp, positive: true },
          { label: 'Pending', value: '$22,500', change: '3 transactions', icon: Clock, positive: true },
          { label: 'Cards active', value: '2', change: 'of 5 issued', icon: CreditCard, positive: true },
          { label: 'Payment links', value: '2', change: '$13,500 volume', icon: Link2, positive: true },
        ].map((stat, i) => (
          <div key={i} className="rt-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-rt-muted text-sm">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-rt-muted" />
            </div>
            <p className="text-2xl font-bold text-rt-text">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.positive ? 'text-rt-success' : 'text-rt-danger'}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Volume Chart + Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rt-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-rt-text">Volume this week</h3>
            <span className="text-xs text-rt-success bg-green-50 px-2 py-1 rounded-full">+24% vs last week</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Volume']}
                />
                <Line type="monotone" dataKey="volume" stroke="#F97316" strokeWidth={3} dot={{ fill: '#F97316', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rt-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-rt-text">Recent Activity</h3>
            <button onClick={() => navigate('/accounts')} className="text-sm text-rt-accent hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-rt-bg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.amount.startsWith('+') ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {activity.amount.startsWith('+') ? (
                      <ArrowDownRight className="w-5 h-5 text-rt-success" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-rt-danger" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-rt-text">{activity.desc}</p>
                    <p className="text-xs text-rt-muted">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${activity.amount.startsWith('+') ? 'text-rt-success' : 'text-rt-text'}`}>
                    {activity.amount}
                  </p>
                  <span className={`text-xs ${
                    activity.status === 'available' ? 'rt-status-available' :
                    activity.status === 'pending' ? 'rt-status-pending' :
                    activity.status === 'processing' ? 'rt-status-processing' :
                    'rt-status-failed'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
