import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import { useAuthStore } from "../store/authStore";

export default function ListObjet({ isAdmin = false, userOnly = false, onEdit }) {
  const { objects, fetchObjects, fetchMyObjects, deleteObject, updateStatus } =
    useStore();
  const user = useAuthStore((s) => s.user);

  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    loadObjects();
  }, [user, userOnly]);

  const loadObjects = async () => {
    if (userOnly && user) await fetchMyObjects();
    else await fetchObjects();
  };

  const handleFilter = async () => {
    if (userOnly) await fetchMyObjects(type, location);
    else await fetchObjects(type, location);
  };

  const resetFilter = () => {
    setType("");
    setLocation("");
    loadObjects();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet objet ?")) return;
    await deleteObject(id);
    alert("Objet supprimé !");
  };

  const handleStatusChange = async (obj) => {
    const newStatus = obj.status === "recovered" ? "not_recovered" : "recovered";
    await updateStatus(obj.id, newStatus);
    alert("Statut mis à jour !");
  };

  if (userOnly && !user) {
    return <p className="text-gray-500 text-center">Veuillez vous connecter.</p>;
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      {/* FILTRES */}
      <div className="max-w-4xl mx-auto mb-12 bg-[#f8f6f4] p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-end gap-4 border border-gray-200">
        <div className="w-full md:w-1/3">
          <label className="block text-sm text-gray-600 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:outline-none"
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
            className="w-full rounded-xl border border-gray-300 px-4 py-2 bg-white focus:outline-none"
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
        {userOnly ? "Mes déclarations" : "Objets récents"}
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
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                  {obj.status === "recovered" ? "Récupéré" : "Non récupéré"}
                </span>

                {(isAdmin || userOnly) && (
                  <div className="mt-3 flex gap-2">
                    {isAdmin && (
                      <button
                        onClick={() => handleStatusChange(obj)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                      >
                        {obj.status === "recovered" ? "Récupéré" : "Non récupéré"}
                      </button>
                    )}

                    {userOnly && onEdit && (
                      <button
                        onClick={() => onEdit(obj)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                      >
                        Modifier
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(obj.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
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
  );
}
