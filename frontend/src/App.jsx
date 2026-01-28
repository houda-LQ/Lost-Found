import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import DashboardLayout from "./components/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import MyDeclarationsPage from "./pages/MyDeclarationsPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
<Route path="my-declarations" element={<MyDeclarationsPage />} />
      </Route>
    </Routes>
  )
}

export default App
