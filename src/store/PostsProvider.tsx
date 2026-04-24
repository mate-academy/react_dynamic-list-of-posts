import { createContext, useMemo, useState } from 'react';
import { Post } from '../types/Post';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Props {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  postsStatus: Status;
  setPostsStatus: React.Dispatch<React.SetStateAction<Status>>;
}

export const PostsContext = createContext<Props>({
  posts: [],
  setPosts: () => {},
  postsStatus: 'idle',
  setPostsStatus: () => {},
});

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsStatus, setPostsStatus] = useState<Status>('idle');

  const value = useMemo(
    () => ({
      posts,
      setPosts,
      postsStatus,
      setPostsStatus,
    }),
    [posts, postsStatus],
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
