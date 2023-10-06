import React, { useMemo, useState } from 'react';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

interface IPostsContext {
  users: User[],
  setUsers: (listOfUsers: User[]) => void,
  posts: Post[],
  setPosts: (v: Post[]) => void,
  selectedUser: User | null,
  setSelectedUser: (newUser: User) => void,
  selectedPost: Post | null,
  setSelectedPost: (newPost: Post | null) => void,
  comments: Comment[],
  setComments: (newComments: Comment[]) => void,
}

export const PostsContext = React.createContext<IPostsContext>({
  users: [],
  setUsers: () => {},
  posts: [],
  setPosts: () => { },
  selectedUser: null,
  setSelectedUser: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
});

export const usePosts = (): IPostsContext => React.useContext(PostsContext);

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const value = useMemo(() => ({
    selectedUser,
    setSelectedUser,
    selectedPost,
    setSelectedPost,
    posts,
    setPosts,
    users,
    setUsers,
    comments,
    setComments,
  }), [selectedUser, posts, users, selectedPost, comments]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
