import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { BedDouble, CalendarDays, Users, CreditCard } from 'lucide-react'

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm">{label}</span>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={16} className="text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value ?? '—'}</p>
    </div>
  )
}

export default function Overview() {
  const [stats, setStats] = useState({})
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const today = new Date().toISOString().split('T')[0]

      const [
        { count: totalRooms },
        { count: occupiedRooms },
        { count: todayCheckIns },
        { count: totalGuests },
        { data: bookings }
      ] = await Promise.all([
        supabase.from('rooms').select('*', { count: 'exact', head: true }),
        supabase.from('rooms').select('*', { count: 'exact', head: true }).eq('status', 'occupied'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('check_in', today),
        supabase.from('guests').select('*', { count: 'exact', head: true }),
        supabase.from('bookings')
          .select('*, guests(full_name), rooms(room_number)')
          .order('created_at', { ascending: false })
          .limit(5)
      ])

      setStats({ totalRooms, occupiedRooms, todayCheckIns, totalGuests })
      setRecentBookings(bookings || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  const statusColors = {
    confirmed: 'bg-emerald-500/10 text-emerald-400',
    pending: 'bg-yellow-500/10 text-yellow-400',
    checked_in: 'bg-blue-500/10 text-blue-400',
    checked_out: 'bg-gray-500/10 text-gray-400',
    cancelled: 'bg-red-500/10 text-red-400',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Good morning, Aaryan 👋</h1>
        <p className="text-gray-400 text-sm mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Rooms" value={stats.totalRooms} icon={BedDouble} color="bg-emerald-500" />
        <StatCard label="Occupied" value={stats.occupiedRooms} icon={BedDouble} color="bg-blue-500" />
        <StatCard label="Today's Check-ins" value={stats.todayCheckIns} icon={CalendarDays} color="bg-purple-500" />
        <StatCard label="Total Guests" value={stats.totalGuests} icon={Users} color="bg-orange-500" />
      </div>

      {/* Recent Bookings */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl">
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-white font-semibold">Recent Bookings</h2>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500 text-sm">Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="p-6 text-gray-500 text-sm">No bookings yet.</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {recentBookings.map(b => (
              <div key={b.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{b.guests?.full_name ?? 'Unknown Guest'}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Room {b.rooms?.room_number} · {b.check_in} → {b.check_out}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">
                    {b.total_amount ? `₹${b.total_amount.toLocaleString('en-IN')}` : '—'}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[b.status] ?? 'bg-gray-700 text-gray-300'}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}