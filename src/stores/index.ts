import { create } from 'zustand'
import { User, Account, Card, PaymentLink, TeamMember } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'usr_123',
    email: 'founder@acme.co',
    name: 'Sarah Chen',
    role: 'owner',
    businessName: 'Acme Studios',
    businessId: 'biz_123',
  },
  isAuthenticated: true,
  login: async (email, _password) => {
    set({
      user: {
        id: 'usr_123',
        email,
        name: 'Sarah Chen',
        role: 'owner',
        businessName: 'Acme Studios',
        businessId: 'biz_123',
      },
      isAuthenticated: true,
    })
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))

interface DashboardState {
  accounts: Account[]
  cards: Card[]
  paymentLinks: PaymentLink[]
  teamMembers: TeamMember[]
  selectedAccountId: string
  setSelectedAccount: (id: string) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  accounts: [
    {
      id: 'acc_1',
      name: 'Operating Account',
      currency: 'rtUSD',
      balance: {
        balance: '125,430.00',
        availableBalance: '98,230.00',
        pendingBalance: '22,500.00',
        holdBalance: '3,200.00',
        reservedBalance: '1,500.00',
        currency: 'rtUSD',
      },
      accountNumber: '****4567',
      routingNumber: '021000021',
      isDefault: true,
    },
    {
      id: 'acc_2',
      name: 'USDC Treasury',
      currency: 'USDC',
      balance: {
        balance: '45,000.00',
        availableBalance: '45,000.00',
        pendingBalance: '0.00',
        holdBalance: '0.00',
        reservedBalance: '0.00',
        currency: 'USDC',
      },
      accountNumber: '****8901',
      routingNumber: '021000021',
      isDefault: false,
    },
  ],
  cards: [
    {
      id: 'card_1',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '28',
      status: 'active',
      cardholderName: 'Sarah Chen',
      spendLimit: '10,000.00',
      spentThisMonth: '3,240.00',
    },
    {
      id: 'card_2',
      lastFour: '8888',
      expiryMonth: '06',
      expiryYear: '27',
      status: 'active',
      cardholderName: 'Mike Ross',
      spendLimit: '5,000.00',
      spentThisMonth: '1,120.00',
    },
  ],
  paymentLinks: [
    {
      id: 'pl_1',
      code: 'acme-invoice-42',
      amount: '2,500.00',
      currency: 'rtUSD',
      description: 'Design services — March 2026',
      status: 'active',
      createdAt: '2026-06-20',
      totalPayments: 3,
      totalVolume: '7,500.00',
    },
    {
      id: 'pl_2',
      code: 'acme-consulting',
      amount: '500.00',
      currency: 'rtUSD',
      description: 'Hourly consulting rate',
      status: 'active',
      createdAt: '2026-06-15',
      totalPayments: 12,
      totalVolume: '6,000.00',
    },
  ],
  teamMembers: [
    { id: 'tm_1', email: 'sarah@acme.co', name: 'Sarah Chen', role: 'owner', status: 'active', joinedAt: '2026-01-15' },
    { id: 'tm_2', email: 'mike@acme.co', name: 'Mike Ross', role: 'admin', status: 'active', joinedAt: '2026-02-01' },
    { id: 'tm_3', email: 'jessica@acme.co', name: 'Jessica Park', role: 'finance', status: 'active', joinedAt: '2026-03-10' },
    { id: 'tm_4', email: 'alex@acme.co', name: 'Alex Rivera', role: 'developer', status: 'pending', joinedAt: '2026-06-28' },
  ],
  selectedAccountId: 'acc_1',
  setSelectedAccount: (id) => set({ selectedAccountId: id }),
}))
