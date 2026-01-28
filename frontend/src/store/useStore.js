import { create } from "zustand";
import api from "../api/axios";

export const useStore = create((set) => ({
  // ===== STATE =====
  objects: [],

  // ===== ACTIONS =====

  // Tous les objets (avec filtres)
  fetchObjects: async (type = "", location = "") => {
    let url = "/objects";

    if (type || location) {
      url = `/objects/filter?type=${type}&location=${location}`;
    }

    const { data } = await api.get(url);
    set({ objects: data.objects });
  },

  // Objets de l'utilisateur connecté
  fetchMyObjects: async () => {
    const { data } = await api.get("/my-objects");
    set({ objects: data });
  },

  // Créer
  createObject: async (formData) => {
    const { data } = await api.post("/objects/create", formData);

    set((state) => ({
      objects: [data.objet, ...state.objects],
    }));
  },

  // Modifier
  updateObject: async (id, formData) => {
    formData.append("_method", "PUT");

    const { data } = await api.post(`/objects/${id}/update`, formData);

    const updatedObject = data.objet;

    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === updatedObject.id ? updatedObject : obj
      ),
    }));
  },

  // Supprimer
  deleteObject: async (id) => {
    await api.delete(`/objects/${id}`);

    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
    }));
  },

  // Changer statut
  updateStatus: async (id, status) => {
    const { data } = await api.put(`/objects/${id}/status`, { status });

    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? data.object : obj
      ),
    }));
  },
}));
