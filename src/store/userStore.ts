import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User } from '../types/User';

interface UserStore {
  selectedUser: User | null;
  selectUser: (user: User) => void;
}

export const useUserStore = create<UserStore>()(
  immer(
    devtools((set) => ({
      selectedUser: null,
      selectUser: (user) => set({ selectedUser: user }),
    })),
  ),
);
