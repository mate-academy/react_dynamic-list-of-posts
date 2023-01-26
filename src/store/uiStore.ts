import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface UiStore {
  isSelectVisible: boolean;
  setSelectVisibility: (status: boolean) => void;
}

export const useUiStore = create<UiStore>()(
  immer(
    devtools((set) => ({
      isSelectVisible: false,
      setSelectVisibility: (status) => set({ isSelectVisible: status }),
    })),
  ),
);
