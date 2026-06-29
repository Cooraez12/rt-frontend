import { useNavigate } from 'react-router-dom'
import { Bell, Search, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../stores'

export default function Header() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="h-16 bg-white border-b border-rt-border flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-80 max-w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-rt-muted" />
          <input
            type="text"
            placeholder="Search transactions, payments, cards..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-rt-border bg-rt-bg text-sm focus:outline-none focus:ring-2 focus:ring-rt-accent/20 focus:border-rt-accent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-rt-bg transition-colors">
          <Bell className="w-5 h-5 text-rt-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rt-accent rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-rt-border">
          <div className="w-8 h-8 rounded-full bg-rt-accent/10 flex items-center justify-center">
            <User className="w-4 h-4 text-rt-accent" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-rt-text">{user?.name}</p>
            <p className="text-xs text-rt-muted capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl hover:bg-rt-bg transition-colors text-rt-muted hover:text-rt-danger"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
