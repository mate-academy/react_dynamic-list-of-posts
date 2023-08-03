import React, {
  createContext,
  PropsWithChildren, useCallback,
  useEffect,
  useState,
} from 'react';
// eslint-disable-next-line import/no-cycle
import { IPost } from '../models/IPost';
// eslint-disable-next-line import/no-cycle
import { useUser } from '../hooks/useUser';
// eslint-disable-next-line import/no-cycle
import { getPostsByUser } from '../api/post.api';
import { CommentProvider } from './comment.context';

interface IPostContext {
  posts: IPost[],
  postsLoadingError: boolean,
  postsLoading: boolean,
  selectedPost: IPost | null,
  onPostSelecting: (post: IPost) => void,
  onPostClosing: () => void,
}

export const PostContext = createContext<IPostContext>({} as IPostContext);

export const PostProvider:React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { selectedUser } = useUser();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postsLoadingError, setPostsLoadingError] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  useEffect(() => {
    const loadPosts = async (userId: number) => {
      setPostsLoading(true);
      setSelectedPost(null);
      const postsFromApi = await getPostsByUser(userId);

      setPostsLoading(false);

      setPosts(postsFromApi);
    };

    if (selectedUser) {
      loadPosts(selectedUser.id)
        .catch(() => setPostsLoadingError(true));
    }
  }, [selectedUser]);

  const onPostSelecting = (post: IPost) => {
    setSelectedPost(post);
  };

  const onPostClosing = useCallback(() => {
    setSelectedPost(null);
  }, []);

  return (
    <PostContext.Provider value={{
      posts,
      postsLoadingError,
      postsLoading,
      selectedPost,
      onPostSelecting,
      onPostClosing,
    }}
    >
      <CommentProvider>
        {children}
      </CommentProvider>
    </PostContext.Provider>
  );
};
