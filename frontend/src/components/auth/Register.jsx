import { useState } from "react"
import api from "../../api/axios"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await api.post("/register", { name, email, password })

      setSuccess("Compte créé avec succès. Vous pouvez vous connecter.")
      setName("")
      setEmail("")
      setPassword("")
    } catch (err) {
      if (err.response?.data?.errors) {
        // Affiche toutes les erreurs de validation Laravel
        const messages = Object.values(err.response.data.errors)
          .flat()
          .join(" ")
        setError(messages)
      } else {
        setError(err.response?.data?.message || "Erreur lors de l'inscription")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}

      <input
        placeholder="Nom"
        className="border border-gray-300 p-3 w-full rounded-xl focus:outline-none "
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

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
        {loading ? "Création..." : "Créer un compte"}
      </button>
    </form>
  )
}
