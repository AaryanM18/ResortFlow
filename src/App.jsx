import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoute from './components/ui/ProtectedRoute'
import DashboardLayout from './components/layout/DashboardLayout'
import Overview from './pages/dashboard/Overview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="bookings" element={<div className="text-white">Bookings coming soon</div>} />
          <Route path="rooms" element={<div className="text-white">Rooms coming soon</div>} />
          <Route path="guests" element={<div className="text-white">Guests coming soon</div>} />
          <Route path="staff" element={<div className="text-white">Staff coming soon</div>} />
          <Route path="tasks" element={<div className="text-white">Tasks coming soon</div>} />
          <Route path="events" element={<div className="text-white">Events coming soon</div>} />
          <Route path="assets" element={<div className="text-white">Assets coming soon</div>} />
          <Route path="payments" element={<div className="text-white">Payments coming soon</div>} />
          <Route path="agents" element={<div className="text-white">AI Agents coming soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}