import { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  hasError: boolean;
}

export function usePosts(userId: number | null) {
  const [state, setState] = useState<PostsState>({
    posts: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    if (!userId) {
      setState({ posts: [], isLoading: false, hasError: false });

      return;
    }

    const loadPosts = async () => {
      setState(prev => ({ ...prev, isLoading: true, hasError: false }));

      try {
        const data = await client.get<Post[]>(`/posts?userId=${userId}`);

        setState({ posts: data, isLoading: false, hasError: false });
      } catch {
        setState({ posts: [], isLoading: false, hasError: true });
      }
    };

    loadPosts();
  }, [userId]);

  return {
    posts: state.posts,
    postsLoading: state.isLoading,
    postsError: state.hasError,
  };
}
