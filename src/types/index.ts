import { ReactNode } from 'react'

export interface NavItem {
  label: string
  path: string
  icon: ReactNode
}

export interface Balance {
  balance: string
  availableBalance: string
  pendingBalance: string
  holdBalance: string
  reservedBalance: string
  currency: string
}

export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'payment' | 'card_auth' | 'card_settlement' | 'conversion' | 'fee' | 'refund'
  amount: string
  currency: string
  status: 'available' | 'pending' | 'processing' | 'failed' | 'returned' | 'hold' | 'reserved'
  description: string
  date: string
  counterparty?: string
}

export interface Account {
  id: string
  name: string
  currency: 'rtUSD' | 'USDC'
  balance: Balance
  accountNumber: string
  routingNumber: string
  isDefault: boolean
}

export interface Card {
  id: string
  lastFour: string
  expiryMonth: string
  expiryYear: string
  status: 'active' | 'frozen' | 'cancelled'
  cardholderName: string
  spendLimit: string
  spentThisMonth: string
}

export interface PaymentLink {
  id: string
  code: string
  amount: string
  currency: string
  description: string
  status: 'active' | 'inactive' | 'expired'
  createdAt: string
  totalPayments: number
  totalVolume: string
}

export interface TeamMember {
  id: string
  email: string
  name: string
  role: 'owner' | 'admin' | 'finance' | 'developer' | 'viewer'
  status: 'active' | 'pending' | 'inactive'
  joinedAt: string
}

export type UserRole = 'owner' | 'admin' | 'finance' | 'developer' | 'viewer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  businessName: string
  businessId: string
}