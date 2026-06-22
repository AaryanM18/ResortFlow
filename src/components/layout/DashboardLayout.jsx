import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}