import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Zap, Check, Lock, CreditCard, Building2, ChevronRight, ArrowLeft, Shield } from 'lucide-react'

export default function CheckoutPage() {
  const { code } = useParams()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'card'>('bank')
  const [completed, setCompleted] = useState(false)

  const handlePay = () => {
    setCompleted(true)
  }

  return (
    <div className="min-h-screen bg-rt-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-rt-accent flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-rt-text">RT.app Checkout</h1>
          <p className="text-rt-muted text-sm">Powered by regulated stablecoin infrastructure</p>
        </div>

        {completed ? (
          <div className="rt-card p-8 text-center animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-rt-success" />
            </div>
            <h2 className="text-xl font-bold text-rt-text mb-2">Payment successful!</h2>
            <p className="text-rt-muted text-sm mb-6">
              Your payment of $2,500.00 has been received. 
              The merchant will be notified instantly.
            </p>
            <div className="rt-card p-4 bg-rt-bg mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-rt-muted">Transaction ID</span>
                <span className="font-mono text-rt-text">tx_849203</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-rt-muted">Status</span>
                <span className="text-rt-success font-medium">Settled</span>
              </div>
            </div>
            <button className="rt-btn-primary w-full">Done</button>
          </div>
        ) : (
          <div className="rt-card p-8">
            {/* Merchant info */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-rt-border">
              <div className="w-10 h-10 rounded-xl bg-rt-accent/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-rt-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-rt-text">Acme Studios</p>
                <p className="text-xs text-rt-muted">Payment link: {code}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="text-center mb-8">
              <p className="text-rt-muted text-sm mb-1">You are paying</p>
              <p className="text-4xl font-bold text-rt-text">$2,500.00</p>
              <p className="text-rt-muted text-sm mt-1">Design services — March 2026</p>
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="rt-label">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="rt-input"
                  />
                  <p className="text-xs text-rt-muted mt-2">We'll send your receipt to this email</p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="rt-btn-primary w-full"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="rt-label">Payment method</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPaymentMethod('bank')}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                        paymentMethod === 'bank'
                          ? 'border-rt-accent bg-rt-accent/5'
                          : 'border-rt-border hover:bg-rt-bg'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-rt-bg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-rt-muted" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-rt-text">Bank account</p>
                        <p className="text-xs text-rt-muted">Connect your bank via ACH</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'bank' ? 'border-rt-accent' : 'border-rt-border'
                      }`}>
                        {paymentMethod === 'bank' && <div className="w-2.5 h-2.5 rounded-full bg-rt-accent" />}
                      </div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                        paymentMethod === 'card'
                          ? 'border-rt-accent bg-rt-accent/5'
                          : 'border-rt-border hover:bg-rt-bg'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-rt-bg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-rt-muted" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-rt-text">Credit card</p>
                        <p className="text-xs text-rt-muted">Visa, Mastercard, Amex</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-rt-accent' : 'border-rt-border'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-rt-accent" />}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 text-green-700 text-sm">
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>Your payment is secured and encrypted</span>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="rt-btn-secondary flex-1">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={handlePay} className="rt-btn-primary flex-1">
                    <Lock className="w-4 h-4" /> Pay $2,500
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-rt-border flex items-center justify-center gap-2 text-xs text-rt-muted">
              <Lock className="w-3 h-3" />
              <span>Secured by regulated stablecoin infrastructure</span>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-rt-muted mt-6">
          Questions? <a href="#" className="text-rt-accent hover:underline">Contact support</a>
        </p>
      </div>
    </div>
  )
}
