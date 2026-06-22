import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { authService } from '../../services/auth'

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    authService.getSession().then(setSession)
  }, [])

  // Still checking
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-emerald-400 text-sm animate-pulse">Loading...</div>
      </div>
    )
  }

  // Not logged in → back to login
  if (!session) return <Navigate to="/login" replace />

  return children
}