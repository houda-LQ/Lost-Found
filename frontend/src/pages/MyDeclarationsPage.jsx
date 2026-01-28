import { useState } from "react";
import MyList from "../components/MyList";
import DeclarationForm from "../components/DeclarationForm";

export default function MyDeclarationsPage() {
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

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="p-6">
      {showForm ? (
        <DeclarationForm
          objectToEdit={selectedObject}
          onCancel={handleCancel}
        />
      ) : (
        <MyList
          userOnly={true}
          onAdd={handleAdd}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
