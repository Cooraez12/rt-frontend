import { useState } from 'react'
import { Plus, Image, ShoppingCart, Check, ExternalLink, QrCode } from 'lucide-react'

const nftProducts = [
  { id: 'p1', name: 'Vertex Pass #001', price: '$250.00', supply: '100', minted: '42', image: '🎨', status: 'active' },
  { id: 'p2', name: 'Bloom Membership', price: '$500.00', supply: '50', minted: '12', image: '🌸', status: 'active' },
  { id: 'p3', name: 'Chain Labs Ticket', price: '$50.00', supply: '1000', minted: '876', image: '🎫', status: 'active' },
]

const nftSales = [
  { id: 's1', product: 'Vertex Pass #001', buyer: '0x42...8f3a', price: '$250.00', date: 'Jun 28, 2026' },
  { id: 's2', product: 'Chain Labs Ticket', buyer: '0x91...2b7c', price: '$50.00', date: 'Jun 28, 2026' },
  { id: 's3', product: 'Bloom Membership', buyer: '0x33...9d1e', price: '$500.00', date: 'Jun 27, 2026' },
]

export default function NFTPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'sales' | 'redemptions'>('products')

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-rt-text">NFT Checkout</h1>
          <p className="text-rt-muted text-sm">Create and sell NFT products with one-click checkout</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="rt-btn-primary">
          <Plus className="w-4 h-4" /> New product
        </button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 animate-slide-up">
            <h3 className="text-xl font-bold text-rt-text mb-6">Create NFT product</h3>
            <div className="space-y-5">
              <div>
                <label className="rt-label">Product name</label>
                <input type="text" placeholder="e.g. Vertex Pass" className="rt-input" />
              </div>
              <div>
                <label className="rt-label">Description</label>
                <textarea placeholder="What does this NFT unlock?" rows={3} className="rt-input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="rt-label">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rt-muted">$</span>
                    <input type="number" placeholder="100" className="rt-input pl-8" />
                  </div>
                </div>
                <div>
                  <label className="rt-label">Supply</label>
                  <input type="number" placeholder="100" className="rt-input" />
                </div>
              </div>
              <div className="border-2 border-dashed border-rt-border rounded-xl p-8 text-center hover:border-rt-accent transition-colors cursor-pointer">
                <Image className="w-8 h-8 text-rt-muted mx-auto mb-2" />
                <p className="text-sm text-rt-muted">Upload NFT artwork or media</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowCreate(false)} className="rt-btn-secondary flex-1">Cancel</button>
                <button onClick={() => setShowCreate(false)} className="rt-btn-primary flex-1">Create product</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="rt-card p-6">
          <span className="text-rt-muted text-sm">Total sales</span>
          <p className="text-2xl font-bold text-rt-text mt-2">$23,450</p>
          <p className="text-xs text-rt-success mt-1">+45% this month</p>
        </div>
        <div className="rt-card p-6">
          <span className="text-rt-muted text-sm">NFTs minted</span>
          <p className="text-2xl font-bold text-rt-text mt-2">930</p>
          <p className="text-xs text-rt-muted mt-1">of 1,150 total supply</p>
        </div>
        <div className="rt-card p-6">
          <span className="text-rt-muted text-sm">Unique buyers</span>
          <p className="text-2xl font-bold text-rt-text mt-2">412</p>
          <p className="text-xs text-rt-success mt-1">+12% this month</p>
        </div>
        <div className="rt-card p-6">
          <span className="text-rt-muted text-sm">Redemptions</span>
          <p className="text-2xl font-bold text-rt-text mt-2">156</p>
          <p className="text-xs text-rt-muted mt-1">17% of minted</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-rt-border">
        {(['products', 'sales', 'redemptions'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-rt-accent text-rt-accent'
                : 'border-transparent text-rt-muted hover:text-rt-text'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nftProducts.map((product) => (
            <div key={product.id} className="rt-card-hover p-6">
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-rt-accent/20 to-rt-secondary/20 flex items-center justify-center text-6xl mb-4">
                {product.image}
              </div>
              <h3 className="font-semibold text-rt-text mb-1">{product.name}</h3>
              <p className="text-rt-accent font-bold text-lg mb-3">{product.price}</p>
              <div className="flex items-center justify-between text-sm text-rt-muted mb-4">
                <span>Supply: {product.supply}</span>
                <span>Minted: {product.minted}</span>
              </div>
              <div className="w-full h-2 bg-rt-bg rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-rt-accent rounded-full"
                  style={{ width: `${(parseInt(product.minted) / parseInt(product.supply)) * 100}%` }}
                />
              </div>
              <div className="flex gap-2">
                <button className="rt-btn-primary flex-1 text-sm py-2">
                  <ShoppingCart className="w-4 h-4" /> Sell
                </button>
                <button className="rt-btn-secondary px-3 py-2">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => setShowCreate(true)} className="rt-card p-6 border-dashed flex flex-col items-center justify-center text-center hover:border-rt-accent hover:bg-rt-bg transition-all min-h-[320px]">
            <Plus className="w-10 h-10 text-rt-muted mb-3" />
            <p className="text-sm font-medium text-rt-text">Create new product</p>
            <p className="text-xs text-rt-muted mt-1">NFTs, tickets, memberships</p>
          </button>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="rt-card p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rt-border">
                  <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Product</th>
                  <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Buyer</th>
                  <th className="text-left text-xs font-medium text-rt-muted py-3 px-4">Date</th>
                  <th className="text-right text-xs font-medium text-rt-muted py-3 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {nftSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-rt-border hover:bg-rt-bg transition-colors">
                    <td className="py-4 px-4 text-sm text-rt-text">{sale.product}</td>
                    <td className="py-4 px-4 text-sm font-mono text-rt-muted">{sale.buyer}</td>
                    <td className="py-4 px-4 text-sm text-rt-muted">{sale.date}</td>
                    <td className="py-4 px-4 text-right text-sm font-medium text-rt-text">{sale.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'redemptions' && (
        <div className="rt-card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-rt-bg flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-rt-success" />
          </div>
          <h3 className="text-lg font-semibold text-rt-text mb-2">Redemption tracking</h3>
          <p className="text-rt-muted text-sm max-w-md mx-auto mb-6">
            When customers redeem their NFTs, you'll see them here. 
            Use the QR code scanner at your venue to verify ownership instantly.
          </p>
          <button className="rt-btn-primary">
            <QrCode className="w-4 h-4" /> Open QR scanner
          </button>
        </div>
      )}
    </div>
  )
}
