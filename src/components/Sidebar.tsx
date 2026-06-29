import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Link2,
  Hexagon,
  Users,
  Settings,
  HelpCircle,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { useAuthStore } from '../stores'

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Accounts', path: '/accounts', icon: Wallet },
  { label: 'Transfers', path: '/transfers', icon: ArrowLeftRight },
  { label: 'Payments', path: '/payments', icon: Link2 },
  { label: 'Cards', path: '/cards', icon: CreditCard },
  { label: 'NFT', path: '/nft', icon: Hexagon },
  { label: 'Team', path: '/team', icon: Users },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export default function Sidebar() {
  const { user } = useAuthStore()
  const location = useLocation()

  return (
    <aside className="w-64 bg-rt-dark flex flex-col h-screen shrink-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-rt-accent flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">RT.app</h1>
          <p className="text-slate-500 text-xs">Business</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={isActive ? 'rt-sidebar-item-active' : 'rt-sidebar-item'}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5">
        <NavLink
          to="/help"
          className="rt-sidebar-item"
        >
          <HelpCircle className="w-5 h-5" />
          <span>Help & Support</span>
        </NavLink>
        <div className="mt-4 px-4 py-3 rounded-xl bg-white/5">
          <p className="text-xs text-slate-500">Signed in as</p>
          <p className="text-sm text-white font-medium truncate">{user?.name}</p>
          <p className="text-xs text-slate-500 truncate">{user?.businessName}</p>
        </div>
      </div>
    </aside>
  )
}
