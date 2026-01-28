import { useState } from "react";
import ListObjet from "./ListObjet";
import DeclarationForm from "./DeclarationForm";

export default function MyList({ userOnly = true }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleAdd = () => {
    setSelectedObject(null);
    setShowForm(true);
  };

  const handleEdit = (obj) => {
    setSelectedObject(obj);
    setShowForm(true);
  };

  return (
    <div>
      {!showForm ? (
        <>
          <button
            onClick={handleAdd}
            className="mb-6 bg-[#82000d] text-white px-4 py-2 rounded hover:bg-red-700"
          >
            + Nouvel objet
          </button>

          <ListObjet userOnly={userOnly} onEdit={handleEdit} />
        </>
      ) : (
        <DeclarationForm
          objectToEdit={selectedObject}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
