import { useCallback, useState } from 'react';
import { getPreparedPosts } from './api/data';

export const useApp = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const loadPosts = useCallback(() => {
    setLoading(true);

    getPreparedPosts()
      .then(data => setPosts(data));

    setLoading(false);
    setLoaded(true);
  }, []);

  return {
    posts,
    isLoaded,
    isLoading,
    loadPosts,
  };
};
