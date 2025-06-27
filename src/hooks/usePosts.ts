import { useState } from 'react';
import { Post } from '../types/Post';
import { ServiceErrors, ServiceErrorsValues } from '../types/Errors';
import { client } from '../utils/fetchClient';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ServiceErrorsValues | null>(null);

  async function getPostsFromServer(userId: number) {
    setError(null);
    setIsLoading(true);

    try {
      const arrayOfPosts: Post[] = await client.get(`/posts?userId=${userId}`);

      setPosts(arrayOfPosts);
    } catch {
      setError(ServiceErrors.Unknown);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    posts,
    isLoading,
    error,
    getPostsFromServer,
  };
};
