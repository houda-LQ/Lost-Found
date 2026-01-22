import { useEffect } from "react"
import { useStore } from "../store/useStore"

export default function ListObjet() {
  const { objects, fetchObjects } = useStore()

  useEffect(() => {
    fetchObjects()
  }, [])

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Objets récents
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {objects.length > 0 ? (
          objects.map((obj) => (
            <div 
              key={obj.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all"
            >
              <img
                src={`http://127.0.0.1:8000/storage/${obj.image}`}
                alt={obj.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{obj.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{obj.location}</p>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {obj.type}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Aucun objet trouvé.
          </p>
        )}
      </div>
    </section>
  )
}
