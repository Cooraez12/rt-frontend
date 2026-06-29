import { Link } from 'react-router-dom'
import { Zap, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../stores'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-rt-bg px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-rt-accent flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-rt-text">Welcome back</h1>
          <p className="text-rt-muted text-sm mt-1">Sign in to your RT.app business account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="rt-label">Email address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-rt-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="rt-input pl-10"
              />
            </div>
          </div>
          <div>
            <label className="rt-label">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-rt-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rt-input pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-rt-muted hover:text-rt-text"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-rt-border" />
              <span className="text-rt-muted">Remember me</span>
            </label>
            <a href="#" className="text-rt-accent hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="rt-btn-primary w-full">
            Sign in <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-rt-muted mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-rt-accent hover:underline font-medium">Get started</Link>
        </p>
      </div>
    </div>
  )
}
