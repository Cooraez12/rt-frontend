import { useNavigate } from 'react-router-dom'
import { Zap, Check, Building2, FileText, Shield, ArrowRight, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const steps = [
  { id: 'business', label: 'Business info', icon: Building2 },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'verify', label: 'Verification', icon: Shield },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const handleComplete = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-rt-bg px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-xl bg-rt-accent flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-rt-text">Verify your business</h1>
          <p className="text-rt-muted text-sm mt-1">We need a few details to activate your account</p>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-4 flex-1">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
                i === currentStep ? 'bg-rt-accent text-white' :
                i < currentStep ? 'bg-green-50 text-green-700' :
                'bg-white text-rt-muted border border-rt-border'
              }`}>
                {i < currentStep ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-rt-muted" />}
            </div>
          ))}
        </div>

        <div className="rt-card p-8">
          {currentStep === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-rt-text mb-6">Business Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="rt-label">Legal business name</label>
                  <input type="text" placeholder="Acme Studios Inc." className="rt-input" />
                </div>
                <div>
                  <label className="rt-label">DBA (if different)</label>
                  <input type="text" placeholder="Acme" className="rt-input" />
                </div>
              </div>
              <div>
                <label className="rt-label">Business type</label>
                <select className="rt-input">
                  <option>Select type</option>
                  <option>Corporation</option>
                  <option>LLC</option>
                  <option>Partnership</option>
                  <option>Sole Proprietorship</option>
                  <option>Non-profit</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="rt-label">EIN (Tax ID)</label>
                  <input type="text" placeholder="XX-XXXXXXX" className="rt-input" />
                </div>
                <div>
                  <label className="rt-label">Industry</label>
                  <select className="rt-input">
                    <option>Select industry</option>
                    <option>Software / Technology</option>
                    <option>E-commerce</option>
                    <option>Professional Services</option>
                    <option>Healthcare</option>
                    <option>Media / Entertainment</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="rt-label">Business address</label>
                <input type="text" placeholder="Street address" className="rt-input mb-3" />
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" placeholder="City" className="rt-input" />
                  <input type="text" placeholder="State" className="rt-input" />
                  <input type="text" placeholder="ZIP" className="rt-input" />
                </div>
              </div>
              <button onClick={() => setCurrentStep(1)} className="rt-btn-primary w-full">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-rt-text mb-6">Upload Documents</h2>
              <div className="border-2 border-dashed border-rt-border rounded-xl p-8 text-center hover:border-rt-accent transition-colors cursor-pointer">
                <FileText className="w-10 h-10 text-rt-muted mx-auto mb-3" />
                <p className="text-sm font-medium text-rt-text mb-1">Upload incorporation documents</p>
                <p className="text-xs text-rt-muted">PDF, JPG, or PNG up to 10MB</p>
              </div>
              <div className="border-2 border-dashed border-rt-border rounded-xl p-8 text-center hover:border-rt-accent transition-colors cursor-pointer">
                <FileText className="w-10 h-10 text-rt-muted mx-auto mb-3" />
                <p className="text-sm font-medium text-rt-text mb-1">Upload proof of address</p>
                <p className="text-xs text-rt-muted">Utility bill or bank statement from last 90 days</p>
              </div>
              <div className="border-2 border-dashed border-rt-border rounded-xl p-8 text-center hover:border-rt-accent transition-colors cursor-pointer">
                <FileText className="w-10 h-10 text-rt-muted mx-auto mb-3" />
                <p className="text-sm font-medium text-rt-text mb-1">Upload ID (passport or driver's license)</p>
                <p className="text-xs text-rt-muted">Clear photo of front and back</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setCurrentStep(0)} className="rt-btn-secondary flex-1">
                  Back
                </button>
                <button onClick={() => setCurrentStep(2)} className="rt-btn-primary flex-1">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-rt-success" />
              </div>
              <h2 className="text-lg font-semibold text-rt-text">Verification submitted</h2>
              <p className="text-rt-muted text-sm max-w-md mx-auto">
                Thank you for providing your business details. Our compliance team will review 
                your application and get back to you within 24 hours. You'll receive an email 
                when your account is activated.
              </p>
              <div className="rt-card p-4 text-left">
                <p className="text-sm font-medium text-rt-text mb-2">What happens next?</p>
                <ul className="space-y-2 text-sm text-rt-muted">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rt-success" /> Document review (1-2 hours)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rt-success" /> Background verification</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rt-success" /> Account activation notification</li>
                </ul>
              </div>
              <button onClick={handleComplete} className="rt-btn-primary w-full">
                Go to dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
