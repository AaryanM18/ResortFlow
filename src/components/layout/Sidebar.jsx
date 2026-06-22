import { NavLink, useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth'
import {
  LayoutDashboard, CalendarDays, BedDouble, Users,
  UserCog, ClipboardList, Sparkles, Package,
  CreditCard, Bot, LogOut
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/bookings', label: 'Bookings', icon: CalendarDays },
  { to: '/dashboard/rooms', label: 'Rooms', icon: BedDouble },
  { to: '/dashboard/guests', label: 'Guests', icon: Users },
  { to: '/dashboard/staff', label: 'Staff', icon: UserCog },
  { to: '/dashboard/tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/dashboard/events', label: 'Events', icon: Sparkles },
  { to: '/dashboard/assets', label: 'Assets', icon: Package },
  { to: '/dashboard/payments', label: 'Payments', icon: CreditCard },
  { to: '/dashboard/agents', label: 'AI Agents', icon: Bot },
]

export default function Sidebar() {
  const navigate = useNavigate()

  async function handleLogout() {
    await authService.signOut()
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gray-900 border-r border-gray-800 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white tracking-tight">
          Resort<span className="text-emerald-400">Flow</span>
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">Management System</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  )
}