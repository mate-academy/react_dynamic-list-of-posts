import { create } from 'zustand';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

interface IState {
  users: User[];
  selectedUser: User;
  posts: Post[] | null;
  selectedPost: Post | null;
  postComments: Comment[] | null;
  postCommentsLoading: boolean;
  postCommentsError: boolean,
  isPostsLoading: boolean;
  showSidebar: number;
  showAddForm: boolean;
  setUsers: (arg: User[]) => void;
  setSelectedUser: (arg: User) => void;
  setPosts: (arg: Post[] | null) => void;
  setSelectedPost: (arg: Post) => void;
  setIsPostsLoading: (arg: boolean) => void;
  setShowSidebar: (arg: number) => void;
  setPostComments: (arg: Comment[]) => void;
  setPostCommentsError: (arg: boolean) => void;
  setPostCommentsLoading: (arg: boolean) => void;
  setShowAddForm: (arg: boolean) => void;
}

const initialUser = {
  name: '',
  id: 0,
  email: '',
  phone: '',
};

export const Store = create<IState>((set) => ({
  users: [],
  selectedUser: initialUser,
  posts: null,
  selectedPost: null,
  postComments: null,
  postCommentsLoading: true,
  postCommentsError: false,
  isPostsLoading: false,
  showSidebar: -1,
  showAddForm: false,
  setUsers: (arg) => set((state) => ({ ...state, users: arg })),
  setSelectedUser: (user) => {
    set((state) => ({ ...state, selectedUser: user }));
  },
  setPosts: (arg) => set((state) => ({ ...state, posts: arg })),
  setSelectedPost:
    (arg: Post) => set((state) => ({ ...state, selectedPost: arg })),
  setIsPostsLoading:
    (arg) => set((state) => ({ ...state, isPostsLoading: arg })),
  setShowSidebar: (arg) => set((state) => ({ ...state, showSidebar: arg })),
  setPostComments:
    (arg: Comment[]) => set((state) => ({ ...state, postComments: arg })),
  setPostCommentsLoading:
    (arg) => set((state) => ({ ...state, postCommentsLoading: arg })),
  setPostCommentsError:
    (arg) => set((state) => ({ ...state, postCommentsError: arg })),
  setShowAddForm: (arg) => set(state => ({ ...state, showAddForm: arg })),
}));
