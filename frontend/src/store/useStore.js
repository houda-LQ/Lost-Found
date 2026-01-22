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
  }
}))
