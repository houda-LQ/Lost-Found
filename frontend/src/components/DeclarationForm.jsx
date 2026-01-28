import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

export default function DeclarationForm({ objectToEdit = null, onCancel }) {
  const createObject = useStore((s) => s.createObject);
  const updateObject = useStore((s) => s.updateObject);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("lost");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (objectToEdit) {
      setTitle(objectToEdit.title);
      setDescription(objectToEdit.description);
      setType(objectToEdit.type);
      setLocation(objectToEdit.location);
      setDate(objectToEdit.date);

      setImage(null);
    } else {
      setTitle("");
      setDescription("");
      setType("lost");
      setLocation("");
      setDate("");
      setImage(null);
    }
  }, [objectToEdit]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("type", type);
  formData.append("location", location);
  formData.append("date", date);

  if (image) {
    formData.append("image", image);
  }

  try {
    if (objectToEdit) {
      await updateObject(objectToEdit.id, formData);
      alert("Modification effectuée !");
    } else {
      await createObject(formData);
      alert("Objet créé !");
    }

    onCancel();
  } catch (error) {
    console.log(error);
    alert("Erreur !");
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="lost">Perdu</option>
          <option value="found">Trouvé</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-[#82000d] text-white hover:bg-red-800"
        >
          {objectToEdit ? "Modifier" : "Déclarer"}
        </button>
      </div>
    </form>
  );
}
