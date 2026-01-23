import { useEffect, useState } from "react"
import { useStore } from "../store/useStore"

export default function ListObjet() {
  const { objects, fetchObjects, fetchFilteredObjects } = useStore()

  const [type, setType] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    fetchObjects()
  }, [])

  const handleFilter = () => {
    fetchFilteredObjects(type, location)
  }

  const resetFilter = () => {
    setType("")
    setLocation("")
    fetchObjects()
  }

  return (
    <section className="py-16 px-6 bg-gray-50">

<div className="max-w-4xl mx-auto mb-12 bg-[#f8f6f4] p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-end gap-4 border border-gray-200">

  <div className="w-full md:w-1/3">
    <label className="block text-sm text-gray-600 mb-1">Type</label>
    <select
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:outline-none "
    >
      <option value="">Tous les types</option>
      <option value="lost">Perdu</option>
      <option value="found">Trouvé</option>
    </select>
  </div>

  <div className="w-full md:w-1/3">
    <label className="block text-sm text-gray-600 mb-1">Lieu</label>
    <input
      type="text"
      placeholder="Ex: Casablanca..."
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:outline-none "
    />
  </div>

  <div className="w-full md:w-auto">
    <button
      onClick={handleFilter}
      className="w-full bg-[#82000d] text-white px-6 py-2 rounded-xl hover:bg-[#6d000b] transition font-medium shadow"
    >
      Filtrer
    </button>
  </div>

  <div className="w-full md:w-auto">
    <button
      onClick={resetFilter}
      className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-100 transition font-medium"
    >
      Réinitialiser
    </button>
  </div>

</div>


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
