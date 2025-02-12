import { create } from "zustand";

export type Model = "zephyr-7b-alpha" | "mistral-small" | "";

type ModelStore = {
  model: Model;
  setModel: (modelName: Model) => void; // Overwrites the entire array
};

const useModelStore = create<ModelStore>((set) => ({
  model: "",
  setModel: (modelName) => set({ model: modelName }),
}));

export default useModelStore;
