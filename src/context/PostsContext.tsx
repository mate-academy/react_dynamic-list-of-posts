import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { Error } from '../types/Error';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export interface ProvidedValue {
  posts: Post[],
  selectedPost: Post | null,
  isPostsPending: boolean,
  isPostsError: boolean,
  handleSelectPost: (post: Post) => void
}

type Props = {
  children: React.ReactNode,
};

export const PostsContext = createContext({} as ProvidedValue);

export const PostsContextProvider = ({ children }: Props) => {
  const { selectedUser } = useUserContext();
  const [isPostsPending, setIsPostsPending] = useState(false);
  const [isPostsError, setIsPostsError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchUserPosts = async () => {
    setIsPostsPending(true);
    setIsPostsError(false);
    setSelectedPost(null);
    if (selectedUser !== null) {
      try {
        const userPosts = await client.get<Post[] | Error>(`/posts?userId=${selectedUser?.id}`);

        if ((userPosts as Error).error) {
          setIsPostsError(true);
        } else {
          setPosts(userPosts as Post[]);
        }
      } catch (error) {
        setIsPostsError(true);
      } finally {
        setIsPostsPending(false);
      }
    }
  };

  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [selectedUser]);

  const providedValue = useMemo(() => ({
    posts,
    selectedPost,
    isPostsPending,
    isPostsError,
    handleSelectPost,
  }), [posts,
    selectedPost,
    isPostsPending,
    isPostsError]);

  return (
    <PostsContext.Provider value={providedValue}>
      {children}
    </PostsContext.Provider>
  );
};
