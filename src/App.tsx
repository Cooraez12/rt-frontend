import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardLayout from './components/DashboardLayout'
import DashboardOverview from './pages/DashboardOverview'
import AccountsPage from './pages/AccountsPage'
import TransfersPage from './pages/TransfersPage'
import PaymentsPage from './pages/PaymentsPage'
import CardsPage from './pages/CardsPage'
import NFTPage from './pages/NFTPage'
import TeamPage from './pages/TeamPage'
import SettingsPage from './pages/SettingsPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/checkout/:code" element={<CheckoutPage />} />
      
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/nft" element={<NFTPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
