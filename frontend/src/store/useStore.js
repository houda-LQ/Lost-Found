import { create } from "zustand"
import axios from "axios"

export const useStore = create((set) => ({
  objects: [],

  fetchObjects: async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/objects")
      set({ objects: res.data.objects })
    } catch (error) {
      console.log(error)
    }
  },

  fetchFilteredObjects: async (type, location) => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/objects/filter", {
        params: {
          type: type || undefined,
          location: location || undefined,
        },
      })

      set({ objects: res.data.objects })
    } catch (error) {
      console.log(error)
    }
  },
}))
