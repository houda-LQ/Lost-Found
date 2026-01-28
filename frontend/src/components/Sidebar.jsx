import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiLogOut,
} from "react-icons/fi";
import { useAuthStore } from "../store/authStore";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); 

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const navItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Mes déclarations", icon: <FiList />, path: "/dashboard/my-declarations" },
  ];

  
  return (
    <aside className="w-20 bg-[#82000d] flex flex-col items-center py-6 min-h-screen">
      

      <nav className="flex flex-col items-center gap-4 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
           className="flex flex-col items-center justify-center w-full h-16 text-white hover:bg-white/20 relative group"
  


            title={item.name}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center w-full">
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center w-full h-16 text-white hover:bg-white/20"
          title="Déconnexion"
        >
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
}
