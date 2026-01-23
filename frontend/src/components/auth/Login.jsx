import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import api from "../../api/axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await api.post("/login", { email, password })

      login(res.data.user, res.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 p-3 w-full rounded-xl focus:outline-none "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Mot de passe"
        className="border border-gray-300 p-3 w-full rounded-xl focus:outline-none "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        disabled={loading}
        className="bg-[#82000d] text-white w-full py-3 rounded-xl font-semibold shadow hover:bg-red-700 transition"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  )
}
