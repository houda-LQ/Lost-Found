import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/auth")
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  )
}
