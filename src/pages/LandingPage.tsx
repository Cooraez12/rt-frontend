import { Link } from 'react-router-dom'
import { Zap, ArrowRight, Shield, Clock, Globe, CreditCard, Hexagon, Check, Star, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rt-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rt-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-rt-dark">RT.app</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-rt-muted hover:text-rt-text transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-rt-muted hover:text-rt-text transition-colors">Pricing</a>
            <a href="#solutions" className="text-sm text-rt-muted hover:text-rt-text transition-colors">Solutions</a>
            <Link to="/login" className="text-sm text-rt-muted hover:text-rt-text transition-colors">Sign in</Link>
            <Link to="/register" className="rt-btn-primary text-sm py-2.5">
              Get started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 rt-hero-gradient">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/90 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Now accepting new businesses — no waitlist
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Settlement at the<br />
            <span className="rt-gradient-text">speed of you</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The business account built for instant settlement. Accept payments, 
            issue cards, and manage stablecoin — all in one place. 
            No more waiting days for your money.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="rt-btn-primary text-lg px-8 py-4">
              Open free account <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="px-8 py-4 rounded-xl text-white font-medium border border-white/20 hover:bg-white/10 transition-colors">
              See how it works
            </a>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 text-slate-500 text-sm">
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> No monthly fees</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Instant settlement</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Stablecoin ready</span>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6 bg-rt-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-rt-text mb-4">
              Everything your business needs
            </h2>
            <p className="text-rt-muted text-lg max-w-2xl mx-auto">
              One platform for payments, cards, and stablecoin treasury. 
              Built for modern businesses that move fast.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: 'Instant Settlement', desc: 'Receive funds in seconds, not days. Bank transfers settle directly to your rtUSD balance.' },
              { icon: CreditCard, title: 'Virtual Cards', desc: 'Issue unlimited virtual cards with custom limits. Real-time controls and instant freeze.' },
              { icon: Shield, title: 'AI Risk Protection', desc: 'Every transaction is scored by AI. Suspicious activity is blocked before it costs you.' },
              { icon: Globe, title: 'Global by Default', desc: 'Accept payments from anywhere. Stablecoin accounts mean no cross-border delays.' },
              { icon: Hexagon, title: 'NFT Checkout', desc: 'Sell NFTs, tickets, and digital collectibles with one-click checkout. No crypto knowledge needed.' },
              { icon: Zap, title: 'Payment Links', desc: 'Create shareable payment links in seconds. Embed on your site, send in messages, or print on invoices.' },
            ].map((f, i) => (
              <div key={i} className="rt-card-hover p-8">
                <div className="w-12 h-12 rounded-xl bg-rt-accent/10 flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-rt-accent" />
                </div>
                <h3 className="text-lg font-semibold text-rt-text mb-2">{f.title}</h3>
                <p className="text-rt-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-rt-text mb-4">
              Get started in minutes
            </h2>
            <p className="text-rt-muted text-lg">
              No paperwork, no waiting weeks. Just your business, verified and ready.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up with your email. Business verification takes under 10 minutes.' },
              { step: '02', title: 'Connect your bank', desc: 'Link your existing bank account or deposit directly via ACH, wire, or stablecoin.' },
              { step: '03', title: 'Start transacting', desc: 'Issue cards, create payment links, and accept payments — all instantly available.' },
            ].map((s, i) => (
              <div key={i} className="relative">
                <span className="text-6xl font-bold text-rt-border">{s.step}</span>
                <h3 className="text-xl font-semibold text-rt-text mt-4 mb-2">{s.title}</h3>
                <p className="text-rt-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-rt-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-rt-text mb-4">
              Loved by businesses that move fast
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Marcus V.', role: 'CEO, Vertex Studios', text: 'We switched from traditional banking to RT and our settlement time went from 3 days to instant. Game changer for our cash flow.' },
              { name: 'Sarah K.', role: 'CFO, Bloom Commerce', text: 'The AI risk monitoring caught a fraudulent charge before it hit us. Saved us $12K in the first month alone.' },
              { name: 'David R.', role: 'Founder, Chain Labs', text: 'We accept USDC from clients globally and RT converts it to rtUSD instantly. No more worrying about exchange rates or delays.' },
            ].map((t, i) => (
              <div key={i} className="rt-card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-rt-accent text-rt-accent" />)}
                </div>
                <p className="text-rt-text mb-6 leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-rt-text text-sm">{t.name}</p>
                  <p className="text-rt-muted text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-rt-text mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-rt-muted text-lg">
              No monthly fees. No hidden charges. Pay only for what you use.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Start', price: 'Free', desc: 'For small businesses getting started', features: ['Unlimited rtUSD accounts', 'Payment links', 'Up to 5 virtual cards', 'Standard settlement (1-2 days)', 'Email support'] },
              { name: 'Grow', price: '$49/mo', desc: 'For growing businesses with volume', features: ['Everything in Start', 'Instant settlement', 'Unlimited virtual cards', 'NFT checkout', 'Priority support', 'Team management (up to 10)'], popular: true },
              { name: 'Scale', price: 'Custom', desc: 'For enterprises with custom needs', features: ['Everything in Grow', 'Dedicated account manager', 'Custom API integrations', 'Advanced AI risk rules', 'Volume discounts', 'SLA guarantees'] },
            ].map((p, i) => (
              <div key={i} className={`rt-card p-8 relative ${p.popular ? 'ring-2 ring-rt-accent' : ''}`}>
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-rt-accent text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-rt-text mb-1">{p.name}</h3>
                <p className="text-rt-muted text-sm mb-4">{p.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-rt-text">{p.price}</span>
                  {p.price !== 'Custom' && p.price !== 'Free' && <span className="text-rt-muted text-sm">/month</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-rt-muted">
                      <Check className="w-4 h-4 text-rt-success shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={p.popular ? 'rt-btn-primary w-full' : 'rt-btn-secondary w-full'}
                >
                  {p.price === 'Custom' ? 'Contact sales' : 'Get started'} <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 rt-hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to settle at your speed?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join 160+ businesses already moving money faster. 
            Open your account in under 10 minutes.
          </p>
          <Link to="/register" className="rt-btn-primary text-lg px-8 py-4">
            Open free account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-rt-dark py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-rt-accent flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-white">RT.app</span>
              </div>
              <p className="text-slate-500 text-sm">
                Settlement at the speed of you. Built for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/" className="hover:text-white transition-colors">Accounts</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Cards</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Payments</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">NFT</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm">© 2026 RT.app. All rights reserved.</p>
            <p className="text-slate-600 text-sm">RealtimePay Inc. — Regulated stablecoin infrastructure</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
