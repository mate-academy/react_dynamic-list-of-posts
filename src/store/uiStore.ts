import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UiStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (status: boolean) => void;
}

export const useUiStore = create<UiStore>()(
  immer(
    devtools((set) => ({
      isSidebarOpen: false,
      setIsSidebarOpen: (status) => set({ isSidebarOpen: status }),
    })),
  ),
);
