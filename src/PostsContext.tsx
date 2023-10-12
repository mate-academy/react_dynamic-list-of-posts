import React, { useContext, useMemo, useState } from 'react';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

interface PostsGlobalContext {
  userPosts: Post[],
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  postComments: Comment[],
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
}

const PostsContext = React.createContext<PostsGlobalContext>({
  userPosts: [],
  setUserPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  postComments: [],
  setPostComments: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const value = useMemo(() => {
    return {
      userPosts,
      setUserPosts,
      selectedPost,
      setSelectedPost,
      postComments,
      setPostComments,
    };
  }, [userPosts, selectedPost, postComments]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export function usePosts() {
  const posts = useContext(PostsContext);

  return posts;
}
