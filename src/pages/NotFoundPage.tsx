import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rt-bg px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-rt-text mb-4">404</h1>
        <p className="text-xl text-rt-muted mb-2">Page not found</p>
        <p className="text-sm text-rt-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="rt-btn-primary">
          <Home className="w-4 h-4" /> Go home
        </Link>
      </div>
    </div>
  )
}
