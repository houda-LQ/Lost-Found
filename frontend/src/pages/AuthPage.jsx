import { useState } from "react"
import Login from "../components/auth/Login"
import Register from "../components/auth/Register"

export default function AuthPage() {
  const [mode, setMode] = useState("login")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-4xl">

        <div className="hidden md:flex md:w-1/2 bg-[#82000d] text-white p-10">
  <div className="m-auto text-center">
    <h2 className="text-4xl font-bold mb-4">Lost&Found</h2>
    <p className="text-gray-200">
      Connectez-vous pour gérer vos objets perdus et trouvés
    </p>
  </div>
</div>


        <div className="w-full md:w-1/2 p-8 bg-beige">
          <div className="mb-6 flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded-xl font-semibold ${
                mode === "login"
                  ? "bg-[#82000d] text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setMode("login")}
            >
              Login
            </button>

            <button
              className={`px-4 py-2 rounded-xl font-semibold ${
                mode === "register"
                  ? "bg-[#82000d] text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          {mode === "login" ? <Login /> : <Register />}
        </div>

      </div>
    </div>
  )
}
