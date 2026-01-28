import { useNavigate } from "react-router-dom"
import gif from "../assets/logo.gif";

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative bg-gradient-to-r from-red-900 via-red-800 to-[#82000d] min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 text-white overflow-hidden">

      <div className="md:w-1/2 mb-10 md:mb-0 ">
                 <img src={gif} alt="photo animation" className="w-120 h-120 rounded-3xl" />

      </div>

      <div className="md:w-1/2 text-center md:text-left md:pl-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Trouvez ou déclarez vos objets perdus
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-100/90 max-w-md">
          Une plateforme simple et rapide pour signaler vos objets perdus ou trouvés et les retrouver facilement.
        </p>
        <button
          onClick={() => navigate("/auth")}
          className="bg-[#82000d] hover:bg-red-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105"
        >
          Déclarer un objet
        </button>
      </div>

      <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/20 rounded-full blur-2xl animate-spin-slow"></div>
    </section>
  )
}
