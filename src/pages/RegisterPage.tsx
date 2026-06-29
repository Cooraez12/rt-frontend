import { Link, useNavigate } from 'react-router-dom'
import { Zap, ArrowRight, Building2, User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../stores'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [businessName, setBusinessName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (step === 1) {
      if (!email || !password) {
        setError('Please fill in all fields')
        return
      }
      setStep(2)
    } else {
      if (!businessName || !firstName || !lastName) {
        setError('Please fill in all fields')
        return
      }
      await login(email, password)
      navigate('/onboarding')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-rt-bg px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-rt-accent flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-rt-text">Create your account</h1>
          <p className="text-rt-muted text-sm mt-1">Start settling at your speed</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-rt-accent' : 'bg-rt-border'}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-rt-accent' : 'bg-rt-border'}`} />
          <div className={`flex-1 h-1 rounded-full ${step >= 3 ? 'bg-rt-accent' : 'bg-rt-border'}`} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {step === 1 ? (
            <>
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
                    placeholder="Min 8 characters"
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
              <div className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-rt-success shrink-0 mt-0.5" />
                <span className="text-rt-muted">By signing up, you agree to our Terms and Privacy Policy</span>
              </div>
              <button type="submit" className="rt-btn-primary w-full">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="rt-label">Business name</label>
                <div className="relative">
                  <Building2 className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-rt-muted" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Acme Studios Inc."
                    className="rt-input pl-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="rt-label">First name</label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-rt-muted" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Sarah"
                      className="rt-input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="rt-label">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Chen"
                    className="rt-input"
                  />
                </div>
              </div>
              <button type="submit" className="rt-btn-primary w-full">
                Create account <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rt-btn-ghost w-full text-sm"
              >
                Back
              </button>
            </>
          )}
        </form>

        <p className="text-center text-sm text-rt-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-rt-accent hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
