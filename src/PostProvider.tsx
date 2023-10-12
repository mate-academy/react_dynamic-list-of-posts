import React, { useMemo, useState } from 'react';
import { Comment } from './types/Comment';
import { Post } from './types/Post';

type ContextProps = {
  posts: Post[],
  setPosts: (newPosts: Post[]) => void,
  selectedPost: Post | null,
  setSelectedPost: (newPost: Post | null) => void,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
};

export const PostContext = React.createContext<ContextProps>({
  posts: [],
  setPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  comments: [],
  setComments: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const value = useMemo(() => ({
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
  }), [posts, selectedPost, comments]);

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
