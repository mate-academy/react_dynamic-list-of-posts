import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Post } from '../types/Post';

interface PostStore {
  selectedPost: Post | null;
  selectPost: (post: Post) => void;
}

export const usePostStore = create<PostStore>()(
  immer(
    devtools((set) => ({
      selectedPost: null,
      selectPost: (post) => set({ selectedPost: post }),
    })),
  ),
);
