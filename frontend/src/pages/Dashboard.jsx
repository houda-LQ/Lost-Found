import DashboardLayout from "../components/DashboardLayout"
import ListObjet from "../components/ListObjet"
import { useAuthStore } from "../store/authStore"

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Tableau de bord
        </h1>

        <ListObjet isAdmin={user?.role === "admin"} />
      </div>
  )
}
