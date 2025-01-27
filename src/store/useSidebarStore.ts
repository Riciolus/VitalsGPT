import { create } from "zustand";

type SidebarStore = {
  toggleSidebar: boolean;
  setToggleSidebar: (value?: boolean) => void; // Overwrites the entire array
};

const useSidebarStore = create<SidebarStore>((set) => ({
  toggleSidebar: false,
  setToggleSidebar: (value) =>
    set((state) => ({
      toggleSidebar: typeof value === "boolean" ? value : !state.toggleSidebar,
    })),
}));

export default useSidebarStore;
